import {SoyuzConnectionInfo} from "../../lib/servers";
import {useEffect, useState} from "react";
import {Chip, Stack} from "@mui/material";
import {Close, Refresh} from "@mui/icons-material";

export function ConnectionStatus(props: {
    failed: boolean,
    failedInfo: string,
    connected: boolean,
    logon: boolean,
    onRefresh?: Function
}) {
    return <Stack direction="row" spacing={1}>
        {props.connected?<Chip label="连接成功" color="success" />:<></>}
        {!props.failed && !props.connected && !props.logon?<Chip label="连接中"/>:<></>}
        {props.logon?<Chip label="鉴权成功" color="success" />:<></>}
        {props.failedInfo!==""?<Chip label={props.failedInfo} color="warning" />:<></>}
        <Chip icon={<Refresh></Refresh>}
              label={"重新连接"}
              onClick={()=>props.onRefresh?.call({})}
        ></Chip>
        {props.connected?<Chip icon={<Close></Close>}
              label={"断开连接"}
              onClick={()=>props.onRefresh?.call({})}
        ></Chip>:<></>}
    </Stack>
}

export function ConnectionPanel(props: SoyuzConnectionInfo) {
    const [logon, setLogon] = useState(false)
    const [failed, setFailed] = useState(false)
    const [failedInfo, setFailedInfo] = useState("")
    const [connected, setConnected] = useState(false)
    const startConnection = () =>{
        const ws = new WebSocket( `ws://` + props.address + ":" + props.port)
        ws.onmessage = (msg) => {
            console.log(msg.data)
            if (!logon) { //处理鉴权相关信息
                const msgObj = JSON.parse(msg.data)
                if(msgObj.key === "authorize" && msgObj.msg === "Session has been authorized") {
                    //token 正确
                    setLogon(true)
                    setFailed(false)
                    setFailedInfo("")
                }else{
                    setLogon(false)
                    setFailed(true)
                    setFailedInfo("Token错误或其他错误")
                }
            }else{ //按组件分配任务

            }
        }
        const sendAuthorize = () =>ws.send(JSON.stringify({
            "key": "authorize",
            "token": props.token
        }))
        ws.onopen = ()=> {
            sendAuthorize()
            setConnected(true)
        }
        ws.onerror = () => {
            setFailedInfo("WS连接失败，请检查地址与端口")
        }
    }
    useEffect(()=>{
        startConnection()
    },[])
    return <>
        <ConnectionStatus failed={failed} failedInfo={failedInfo} connected={connected} logon={logon}></ConnectionStatus>
    </>
}

