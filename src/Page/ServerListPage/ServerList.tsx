import {deleteSoyuzConnectionByID, SoyuzConnectionInfo} from "../../lib/servers";
import {IconButton, List, ListItem, ListItemText} from "@mui/material";
import Typography from "@mui/material/Typography";
import {formatDate} from "../../lib/utils";
import {Delete, Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";
export function ServerListItem(props:{
    info:SoyuzConnectionInfo,
    onChange?:Function
}) {
    const v = props.info
    const [seeToken, setSeeToken] = useState(false)
    const handleDelete = () => {
        deleteSoyuzConnectionByID(v.id)
        props.onChange?.call({})
    }

    return <ListItem
        alignItems="flex-start"
        key={v.id}
        secondaryAction={
            <>
                <IconButton aria-label="see" onClick={()=>setSeeToken(!seeToken)}>
                    {seeToken?<VisibilityOff />:<Visibility />}
                </IconButton>

                <IconButton aria-label="delete" onClick={handleDelete}>
                    <Delete />
                </IconButton>
            </>
        }>
        <ListItemText
            primary={v.name}
            secondary={
                <>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        IP:{v.address}{"        "} 端口:{v.port} {"        "} Token:{seeToken?v.token:"*************"}
                    </Typography>
                    {` - 添加时间: ${formatDate(v.addTime)}`}
                </>
            }
        />
    </ListItem>
}

export function ServerList(props:{
    list:Array<SoyuzConnectionInfo>,
    onChange?:Function
}) {
    return  <List>{
        props.list.map((v)=>{
            return <ServerListItem info={v} key={v.id} onChange={()=>props.onChange?.call({})}/>
        })
    }</List>
}