import {Chip, Stack} from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SourceIcon from '@mui/icons-material/Source';

export interface RepoMetadata {
    commit:string
    name:string
    timestamp:number
    api:string
}

export function MetadataInfo(props:RepoMetadata = {commit:"loading",name:"loading",timestamp:0,api:"unknown"}) {
    const date = new Date(props.timestamp)
    return <Stack direction="row" spacing={1}>
        <Chip icon={<SourceIcon />} label={`${props.name}`}  color="primary"  variant="outlined"/>
        <Chip icon={<CalendarMonthIcon />} label={`Update:${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}  color="primary"  variant="outlined"/>
    </Stack>
}

export default MetadataInfo