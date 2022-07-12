import Typography from "@mui/material/Typography";
import {SoyuzConnectionInfo} from "../../lib/servers";
import {useLocation} from "react-router-dom";
export function ConnectionInfo(info: SoyuzConnectionInfo) {
    return <>
        <Typography
            sx={{ display: 'inline' }}
            component="span"
            color="text.primary">
            {info.name} - IP:{info.address} 端口{info.port}
        </Typography>
    </>
}

export function Connection(props: SoyuzConnectionInfo) {
    return  <>
        <ConnectionInfo {...props}/>
    </>
}

export function ConnectionPage(){
    const {state} = useLocation()
    const info = (state as any).info
    return <Connection {...info}></Connection>
}