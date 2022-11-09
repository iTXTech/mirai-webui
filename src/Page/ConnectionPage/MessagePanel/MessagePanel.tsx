import Typography from "@mui/material/Typography";

export function MessagePanel(props: {
    messages:Array<string>
}) {
    return <>
        {props.messages.map((message:string, idx) => (
            <Typography key={idx}>{message}</Typography>
        ))}
    </>
}