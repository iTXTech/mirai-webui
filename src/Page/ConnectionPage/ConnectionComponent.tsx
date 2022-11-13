import {SoyuzConnectionInfo} from "../../lib/servers";
import {useEffect, useState} from "react";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {MessagePanel} from "./MessagePanel/MessagePanel";
import {Chip, FormControl, IconButton, Input, InputAdornment, Stack} from "@mui/material";
import {ArrowRight, Refresh} from "@mui/icons-material";
import {KEY_SOYUZ_INPUT_COMMAND} from "../../lib/messages";

export enum SoyuzConnectionStatus {
    ERROR = 0, // 在Websocket组件中除了OPEN、Connecting之外的状态（Closing、Closed、Uninstantiated）
    PENDING = 1, // 在Websocket组件中Connecting状态
    UNLOGON = 2, // 在Websocket组件中OPEN状态，但是还没有鉴权
    LOGON = 3, // 在Websocket组件中OPEN状态，且已经鉴权
    //LOGON状态下可以正常进行操作
    AUTHORIZE_ERROR = 4, // 在Websocket组件中OPEN状态，但是鉴权失败
}

export const ConnectionStatusInfo = (props: {
    status: SoyuzConnectionStatus
}) => {
    switch (props.status) {
        case SoyuzConnectionStatus.ERROR:
            return <Chip label="连接失败" color="error" />
        case SoyuzConnectionStatus.PENDING:
            return <Chip label="正在连接" color="warning" />
        case SoyuzConnectionStatus.UNLOGON:
            return <Chip label="连接成功，正在鉴权" color="warning" />
        case SoyuzConnectionStatus.LOGON:
            return <Chip label="鉴权成功" color="success" />
        case SoyuzConnectionStatus.AUTHORIZE_ERROR:
            return <Chip label="鉴权失败" color="error" />
    }
}

export const ConnectionStatusPanel = (props: {
    status: SoyuzConnectionStatus,
    onRefresh?: Function
}) => {
    return <Stack direction="row" spacing={1}>
        <ConnectionStatusInfo status={props.status}></ConnectionStatusInfo>
        <Chip icon={<Refresh></Refresh>}
              label={"重新连接"}
              onClick={()=>props.onRefresh?.call({})}
        ></Chip>
    </Stack>
}

export function CommandInput(props:{
    onSendCommand?:Function
}) {
    const [command, setCommand] = useState("")
    return <>
        <FormControl fullWidth sx={{ m: 1 }}>
            <Input
                value={command}
                onChange={(e)=>setCommand(e.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onMouseDown={()=>props.onSendCommand?.call({},command)}
                        >
                            <ArrowRight></ArrowRight>
                        </IconButton>
                    </InputAdornment>
                }
            ></Input>
        </FormControl>
    </>
}

export const ConnectionComponent = (props: SoyuzConnectionInfo) => {
    const [socketUrl] = useState(`ws://` + props.address + ":" + props.port)
    const [isOpen, setIsOpen] = useState(true);
    const [shouldReconnect, setShouldReconnect] = useState(false)
    const [messageHistory, setMessageHistory] = useState(Array<string>());
    const [status, setStatus] = useState(SoyuzConnectionStatus.PENDING)
    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl,{shouldReconnect: ()=>shouldReconnect}, isOpen)

    // 鉴权回传相关操作
    useEffect(() => {
        if (lastMessage === null) return
        switch (status) {
            case SoyuzConnectionStatus.UNLOGON:
                const msgObj = JSON.parse(lastMessage.data.toString())
                if(msgObj.msg === "Session has been authorized") setStatus(SoyuzConnectionStatus.LOGON)
                else setStatus(SoyuzConnectionStatus.AUTHORIZE_ERROR)
                break
            default:
                setMessageHistory((prev) => prev.concat(lastMessage.data.toString()));
        }

    }, [lastMessage, setMessageHistory]);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    //Websocket状态变化驱动鉴权状态改变
    useEffect(()=>{
        if(connectionStatus === 'Open') setStatus(SoyuzConnectionStatus.UNLOGON)
        else if(connectionStatus === 'Connecting') setStatus(SoyuzConnectionStatus.PENDING)
        else setStatus(SoyuzConnectionStatus.ERROR)
    }, [connectionStatus])

    //状态改变驱动鉴权等操作
    useEffect(()=>{
        switch (status) {
            case SoyuzConnectionStatus.UNLOGON:
                sendMessage(JSON.stringify({
                    "key": "authorize",
                    "token": props.token
                }))
                break
        }
    }, [status])

    const refreshConnection = ()=>{
        setShouldReconnect(true)
        setIsOpen(false)
        setTimeout(()=>setIsOpen(true), 1000)
    }

    const sendCommand = (cmd:string) => {
        setMessageHistory((prev) => prev.concat(JSON.stringify({
            "key": KEY_SOYUZ_INPUT_COMMAND,
            "input": cmd
        })));
        sendMessage(JSON.stringify({
            key: "soyuz-run-command",
            command: cmd
        }))
    }

    return (
        <>
            <ConnectionStatusPanel status={status} onRefresh={()=>refreshConnection()}></ConnectionStatusPanel>
            <MessagePanel messages={messageHistory} onCommand={sendCommand}/>
        </>
    );
    // <CommandInput onSendCommand={sendCommand}></CommandInput>
}