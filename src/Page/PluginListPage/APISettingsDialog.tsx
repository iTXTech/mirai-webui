import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl, FormControlLabel, MenuItem, Radio, RadioGroup,
    Select,
    TextField
} from "@mui/material";
import {useEffect, useState} from "react";
export function APISettingsDialog(props: {
    open:boolean
    setOpen:Function
    api:string
    setApi:Function
}) {
    const {open, setOpen} = props

    const [name, setName] = useState('preset')

    const [nowAPI, setNowAPI] = useState('')

    useEffect(()=>{
        setNowAPI(props.api)
    },[props.api])

    const defaultAPIs = [
        "https://repo.iTXTech.org"
    ]
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event: { target: { value: any; }; }) => {
        setNowAPI(event.target.value);
    };

    const updateAPI = () => {
        props.setApi(nowAPI)
        setOpen(false);
    }

    return <>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"设置Source API"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    可以在不同的源API间进行切换，以应对可能出现的网络问题
                </DialogContentText>

                <FormControl fullWidth>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={name}
                        onChange={(event)=>setName(event.target.value)}
                    >
                        <FormControlLabel value="preset" control={<Radio />} label="预设" />
                        <FormControlLabel value="custom" control={<Radio />} label="自定义" />
                    </RadioGroup>

                    {name==='preset'?
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={nowAPI}
                            onChange={handleChange}
                        >
                            {defaultAPIs.map((v)=>(<MenuItem value={v}>{v}</MenuItem>))}
                        </Select>
                    :<TextField id="outlined-basic" label="API地址(https://...)" value={nowAPI} onChange={handleChange} variant="outlined" />
                    }
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>取消</Button>
                <Button onClick={updateAPI} autoFocus>
                    确定
                </Button>
            </DialogActions>
        </Dialog>
    </>
}
export default APISettingsDialog