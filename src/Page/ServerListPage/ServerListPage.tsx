import {useEffect, useState} from "react";
import {getConnectionsFromStorage, SoyuzConnectionInfo} from "../../lib/servers";

import Typography from "@mui/material/Typography";
import {ServerList} from "./ServerList";
import {AddServerButton} from "./AddServerButton";


export function ServerListPage() {
    const refreshList = () => setConnList(getConnectionsFromStorage())
    const [connList, setConnList] = useState(Array<SoyuzConnectionInfo>())
    useEffect(()=>refreshList(),[])
    return <>
        <Typography variant="h5" component="h5">
            已保存的服务器
        </Typography>
        <ServerList list={connList}  onChange={refreshList}></ServerList>
        <AddServerButton onChange={refreshList}></AddServerButton>
    </>
}

export default ServerListPage