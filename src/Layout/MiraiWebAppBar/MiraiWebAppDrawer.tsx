import {Divider, Drawer, List} from "@mui/material";
import {Dispatch} from "react";
import {MainListItems, secondaryListItems} from "./DrawerListItems";

export default function MiraiWebAppDrawer(props: {
    open: boolean,
    setOpen: Dispatch<boolean>
}) {
    return <Drawer open={props.open} onClose={()=>props.setOpen(false)}>
        <Divider/>
        <List component="nav">
            <MainListItems></MainListItems>
            <Divider sx={{my: 1}}/>
            {secondaryListItems}
        </List>
    </Drawer>
};