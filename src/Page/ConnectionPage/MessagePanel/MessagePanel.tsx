import Terminal, {ColorMode, TerminalOutput} from "react-terminal-ui";
import {SetStateAction, useEffect, useState} from "react";
import {InputCommandMessage, KEY_SOYUZ_RUN_COMMAND, SoyuzCommandMessage, SoyuzMessage} from "../../../lib/messages";

export function MessagePanel(props: {
    messages: Array<string>
    onCommand?: (cmd: string) => void
}) {
    return <>
        <TerminalController {...props}></TerminalController>
    </>
}

const TerminalController = (props: {
    messages: Array<string>
    onCommand?: (cmd: string) => void
}) => {
    const [terminalLineData, setTerminalLineData] = useState([
        <TerminalOutput key={0}>Mirai Console</TerminalOutput>
    ]);
    const [msgKey, setMsgKey] = useState(1);
    useEffect(() => {
        const newLines: SetStateAction<JSX.Element[]> = []
        let index = 0
        for(let msg of props.messages){
            index += 1
            try {
                const msgObj = JSON.parse(msg) as SoyuzMessage
                if(msgObj.key === KEY_SOYUZ_RUN_COMMAND) {
                    const commandMessage = msgObj as SoyuzCommandMessage
                    if (commandMessage.result === "UnresolvedCommand")
                        newLines.push(<TerminalOutput key={msgKey + index} color="red">未能识别的命令</TerminalOutput>)
                    if (commandMessage.result === "Success") {
                        if (!commandMessage.output) newLines.push(<TerminalOutput key={msgKey + index}
                                                                                  color="red">未能识别的命令</TerminalOutput>)
                        else {
                            for (let i of commandMessage.output) {
                                index += 1
                                newLines.push(<TerminalOutput key={msgKey + index}>{i}</TerminalOutput>)
                            }
                        }
                    }
                }
                if(msgObj.key === "soyuz-input-command"){
                    const commandMessage = msgObj as InputCommandMessage
                    newLines.push(<TerminalOutput key={msgKey + index}>{"> "+commandMessage.input}</TerminalOutput>)
                }
            }catch (e) {
                newLines.push(<TerminalOutput key={msgKey+index}>{msg}</TerminalOutput>)
                console.log(e)
            }
        }
        setMsgKey(msgKey + index)

        setTerminalLineData(newLines)
    },[props.messages])
    return (
        <div className="container">
            <Terminal colorMode={ColorMode.Light} onInput={ props.onCommand } prompt={">"}>
                { terminalLineData }
            </Terminal>
        </div>
    )
}