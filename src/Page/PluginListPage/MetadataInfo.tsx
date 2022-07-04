import {Chip, Stack} from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SourceIcon from '@mui/icons-material/Source';
import SettingsIcon from '@mui/icons-material/Settings';
import {useState} from "react";
import APISettingsDialog from "./APISettingsDialog";
import {formatDate} from "../../lib/utils";

export interface RepoMetadata {
    commit:string
    name:string
    timestamp:number
    api:string
    setApi:Function
}

export function MetadataInfo(props:RepoMetadata = {commit:"loading",name:"loading",timestamp:0,api:"unknown",setApi:()=>{}}) {
    const date = new Date(props.timestamp)
    const [open,setOpen] = useState(false)
    const handleDelete = () => {
        setOpen(true)
    };
    return <>
        <Stack direction="row" spacing={1}>
            <Chip icon={<SourceIcon />} label={`${props.name}` }
                  onDelete={handleDelete} deleteIcon={<SettingsIcon />} color="primary"  variant="outlined"/>
            <Chip icon={<CalendarMonthIcon />} label={`Update:${formatDate(date)}`}  color="primary"  variant="outlined"/>
        </Stack>
        <APISettingsDialog {...props} open={open} setOpen={setOpen} ></APISettingsDialog>
    </>
}

export default MetadataInfo