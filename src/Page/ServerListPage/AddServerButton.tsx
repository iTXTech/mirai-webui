import {useState} from "react";
import {addSoyuzConnection} from "../../lib/servers";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    TextField
} from "@mui/material";
import {Add} from "@mui/icons-material";

export function AddServerButton(props:{
    onChange?:Function
}) {
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    const [port, setPort] = useState("");
    const [token, setToken] = useState("");

    const handleClose = () => {
        setOpen(!open);
    };

    const handleOpen = () => {
        if(!open) setOpen(true)
    };

    const handleValueChange = (fun:Function) => {
        return (event: { target: { value: any; }; })=>{
            fun(event.target.value)
        }
    }

    const handleReset = () => {
        setAddress("")
        setName("")
        setPort("")
        setToken("")
    }



    const addServer = () => {
        let n = name
        if(n==="") n = `${address}:${port}`
        addSoyuzConnection({
            id:"",
            address,
            name:n,
            port,
            token,
            addTime:new Date()
        })
        handleClose()
        props.onChange?.call({})
    }

    return <Fab size="medium" color="secondary" aria-label="add"   onClick={handleOpen}>
        <Add/>

        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>增加服务器</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    请输入服务器的IP，端口以及token，并为其命名
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="名字（选填）"
                    value={name}
                    onChange={handleValueChange(setName)}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="ip"
                    label="IP"
                    onChange={handleValueChange(setAddress)}
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="port"
                    label="端口"
                    onChange={handleValueChange(setPort)}
                    type="number"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="token"
                    label="Token"
                    onChange={handleValueChange(setToken)}
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleReset}>清空</Button>
                <Button onClick={handleClose}>取消</Button>
                <Button onClick={addServer}>确定</Button>
            </DialogActions>
        </Dialog>
    </Fab>
}
