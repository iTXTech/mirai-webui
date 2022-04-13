import Container from "@mui/material/Container";
import {Button, Card, CardActions, CardContent, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {requestPluginList} from "../lib/requests";
import {useEffect, useState} from "react";
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export interface PluginListInfo {
    package:string
    name:string
    type:string
    website:string
    description:string
    defaultChannel:string
}
export default function() {
    const [pluginData, setPluginData] = useState(Array<PluginListInfo>())
    useEffect(()=>{
        requestPluginList().then(res=>{
            const pluginListArray = new Array<PluginListInfo>()
            for(let i in res.data){
                res.data[i].package = i
                pluginListArray.push(res.data[i])
            }

            setPluginData(pluginListArray.filter((value => value.package!=='metadata')))
        })
    },[])
    return <>
        <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
                {pluginData.map((plugin) => (
                    <Grid item key={plugin.package} xs={12} sm={6} md={4}>
                        <Card
                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {plugin.name}
                                </Typography>
                                <Typography>
                                    {plugin.package}
                                </Typography>
                                <Typography>
                                    {plugin.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">View</Button>
                                <Button size="small">Edit</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    </>
}