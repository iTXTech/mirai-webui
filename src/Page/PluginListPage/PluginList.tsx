import {Button, Card, CardActions, CardContent, Chip, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {PluginListInfo} from "./PluginListPage";
//export const DefaultLogo = "https://avatars.githubusercontent.com/u/15979485?s=200&v=4"
export function PluginList(props:{
    list:Array<PluginListInfo>
}) {
    return <>
        <Grid container spacing={4}>
            {props.list.map((plugin) => (
                <Grid item key={plugin.package} xs={12} sm={6} md={4}>
                    <Card
                        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {plugin.name}
                            </Typography>
                            <Typography>
                                {plugin.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                             <Grid width={'80%'}>
                                 <Chip label={plugin.defaultChannel} size={"small"}></Chip>
                                 <Chip label={plugin.type} size={"small"}></Chip>
                             </Grid>
                            <Button size="small">详细信息</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </>
}
export default PluginList