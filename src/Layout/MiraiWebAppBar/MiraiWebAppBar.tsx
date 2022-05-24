import {AppBar, IconButton, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Dispatch, useState} from "react";
import {Menu} from "@mui/icons-material";

export function MiraiWebAppBar(props:{
    title:string,
    open:boolean,
    setOpen:Dispatch<boolean>
}) {
    useState()
    const changeOpenState = ()=>{
        props.setOpen(!props.open)
    }
    return <AppBar
        position="static"
        color="default"
        elevation={0}
    >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={()=>changeOpenState()}
            >
                <Menu />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                {props.title}
            </Typography>
        </Toolbar>
    </AppBar>
}

export default MiraiWebAppBar