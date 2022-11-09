import Typography from "@mui/material/Typography";
import {SoyuzConnectionInfo} from "../../lib/servers";
import {useLocation} from "react-router-dom";
import {ConnectionComponent} from "./ConnectionComponent";
export function ConnectionInfo(info: SoyuzConnectionInfo) {
    return <>
        <Typography variant="h5" component="h5">
            Soyuz连接 {" "}
            <Typography component="span">
                IP:{info.address} 端口{info.port}
            </Typography>
        </Typography>
    </>
}



export function Connection(props: SoyuzConnectionInfo) {
    return  <>
        <ConnectionInfo {...props}/>
        <ConnectionComponent {...props}/>
    </>
}

export function ConnectionPage(){
    const {state} = useLocation()
    const info = (state as any).info
    return <Connection {...info}></Connection>
}