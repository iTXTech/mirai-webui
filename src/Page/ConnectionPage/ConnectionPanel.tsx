import {SoyuzConnectionInfo} from "../../lib/servers";
import {useEffect, useState} from "react";

export function ConnectionPanel(props: SoyuzConnectionInfo) {
    const [logon, setLogon] = useState(false)
    const [failed, setFailed] = useState(false)
    const [failedInfo, setFailedInfo] = useState("")
    const startConnection = () =>{
        const ws = new WebSocket( `ws://` + props.address + ":" + props.port)
        ws.onmessage = (msg) => {
            console.log(msg.data)
            if (!logon) {
                const msgObj = JSON.parse(msg.data)
                if(msgObj.key === "authorize" && msgObj.msg === "Session has been authorized") {
                    //token 正确
                    setLogon(true)
                    setFailed(false)
                }else{
                    setLogon(false)
                    setFailed(true)
                    setFailedInfo("Token错误或其他错误")
                }
            }
        }
        ws.send(JSON.stringify({
            "key": "authorize",
            "token": props.token
        }))
    }
    useEffect(()=>{
        startConnection()
    },[])
    return <>

    </>
}