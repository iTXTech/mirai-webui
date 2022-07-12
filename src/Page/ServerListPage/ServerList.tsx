import {deleteSoyuzConnectionByID, SoyuzConnectionInfo} from "../../lib/servers";
import {IconButton, List, ListItem, ListItemText} from "@mui/material";
import Typography from "@mui/material/Typography";
import {formatDate} from "../../lib/utils";
import {ArrowForward, Delete, Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
export function ServerListItem(props:{
    info:SoyuzConnectionInfo,
    onChange?:Function
}) {
    const info = props.info
    const [seeToken, setSeeToken] = useState(false)
    const handleDelete = () => {
        deleteSoyuzConnectionByID(info.id)
        props.onChange?.call({})
    }

    const navigate = useNavigate()
    const openConnectionPage = () => {
        navigate("/connection", {
            state: {
                info
            }
        })
    }

    return <ListItem
        alignItems="flex-start"
        key={info.id}
        secondaryAction={
            <>
                <IconButton aria-label="see" onClick={()=>openConnectionPage()}>
                    <ArrowForward></ArrowForward>
                </IconButton>

                <IconButton aria-label="see" onClick={()=>setSeeToken(!seeToken)}>
                    {seeToken?<VisibilityOff />:<Visibility />}
                </IconButton>

                <IconButton aria-label="delete" onClick={handleDelete}>
                    <Delete />
                </IconButton>
            </>
        }>
        <ListItemText
            primary={info.name}
            secondary={
                <>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        IP:{info.address}{"        "} 端口:{info.port} {"        "} Token:{seeToken?info.token:"*************"}
                    </Typography>
                    {` - 添加时间: ${formatDate(info.addTime)}`}
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