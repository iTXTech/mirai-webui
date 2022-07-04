import {ListItemButton, ListItemIcon, ListItemText, ListSubheader} from "@mui/material";
import {Dashboard, Storage} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
export const MainListItems = () => {
    const navigate = useNavigate()
    return <>
        <ListItemButton onClick={()=>navigate("/")}>
            <ListItemIcon>
                <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Mirai Repo" />
        </ListItemButton>

        <ListItemButton onClick={()=>navigate("/servers")}>
            <ListItemIcon>
                <Storage />
            </ListItemIcon>
            <ListItemText primary="已保存的服务器" />
        </ListItemButton>
    </>
}
export const secondaryListItems = (
    <>
        <ListSubheader component="div" inset>
            已保存的服务器
        </ListSubheader>
    </>
);