import {Divider, Drawer, List} from "@mui/material";
import {Dispatch} from "react";
import {mainListItems, secondaryListItems} from "./DrawerListItems";

export default function MiraiWebAppDrawer(props: {
    open: boolean,
    setOpen: Dispatch<boolean>
}) {
    return <Drawer open={props.open} onClose={()=>props.setOpen(false)}>
        <Divider/>
        <List component="nav">
            {mainListItems}
            <Divider sx={{my: 1}}/>
            {secondaryListItems}
        </List>
    </Drawer>
};