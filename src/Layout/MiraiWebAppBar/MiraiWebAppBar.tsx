import {AppBar, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
export interface AppBarInfo {
    title:string
}

export function MiraiWebAppBar(props:AppBarInfo) {
    return <AppBar
        position="static"
        color="default"
        elevation={0}
    >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                {props.title}
            </Typography>
        </Toolbar>
    </AppBar>
}

export default MiraiWebAppBar