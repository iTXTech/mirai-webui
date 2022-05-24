import {ListItemButton, ListItemIcon, ListItemText, ListSubheader} from "@mui/material";
import {Dashboard} from "@mui/icons-material";

export const mainListItems = (
    <>
        <ListItemButton>
            <ListItemIcon>
                <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Mirai Repo" />
        </ListItemButton>
    </>
);

export const secondaryListItems = (
    <>
        <ListSubheader component="div" inset>
            已保存的服务器
        </ListSubheader>
    </>
);