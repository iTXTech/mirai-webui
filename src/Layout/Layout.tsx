import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import StickyFooter from "./Footer/StickyFooter";
import AppBar from "./MiraiWebAppBar/MiraiWebAppBar";
import {ReactElement} from "react";

export interface LayoutInfo {
    title:string,
    children:ReactElement
}

export default function Layout(props:LayoutInfo) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <CssBaseline />
            <AppBar title={props.title}/>
            <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="lg">
                {props.children}
            </Container>
            <StickyFooter/>
        </Box>
    );
}