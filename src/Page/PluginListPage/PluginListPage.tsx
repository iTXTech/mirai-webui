import Container from "@mui/material/Container";
import {Button, Card, CardActions, CardContent, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {requestPluginList} from "../../lib/requests";
import {useEffect, useState} from "react";
import MetadataInfo from "./MetadataInfo";
export interface PluginListInfo {
    package:string
    name:string
    type:string
    website:string
    description:string
    defaultChannel:string
}

export interface RepoMetadata {
    commit?:string
    name?:string
    timestamp?:number
}
export function PluginListPage() {
    const [api] = useState('https://repo.itxtech.org')
    const [pluginData, setPluginData] = useState(Array<PluginListInfo>())
    const [metadata, setMetadata] = useState({} as any)
    useEffect(()=>{
        requestPluginList(api).then(res=>{
            const pluginListArray = new Array<PluginListInfo>()
            setMetadata(res.data.metadata)
            const packages = res.data.packages
            for(let i in packages){
                packages[i].package = i
                pluginListArray.push(packages[i])
            }
            setPluginData(pluginListArray.filter((value => value.name!==undefined)))
        })
    },[api])
    return <>
        <Container maxWidth="md">
            <Grid container spacing={4}>
                <Grid item sm={12}>
                    <MetadataInfo {...metadata} api={api}></MetadataInfo>
                </Grid>
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

export default PluginListPage