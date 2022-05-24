import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import StickyFooter from "./Footer/StickyFooter";
import {MiraiWebAppBar} from "./MiraiWebAppBar/MiraiWebAppBar";
import {ReactElement, useState} from "react";
import MiraiWebAppDrawer from "./MiraiWebAppBar/MiraiWebAppDrawer";

export interface LayoutInfo {
    title:string,
    children:ReactElement
}

export default function Layout(props:LayoutInfo) {
    const [open, setOpen] = useState(false)
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <CssBaseline />
            <MiraiWebAppBar title={props.title} open={open} setOpen={setOpen}></MiraiWebAppBar>
            <MiraiWebAppDrawer open={open} setOpen={setOpen}></MiraiWebAppDrawer>
            <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="lg">
                {props.children}
            </Container>
            <StickyFooter/>
        </Box>
    );
}