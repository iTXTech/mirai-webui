import Container from "@mui/material/Container";
import {Grid} from "@mui/material";
import {requestPluginList} from "../../lib/requests";
import {useEffect, useState} from "react";
import MetadataInfo from "./MetadataInfo";
import PluginList from "./PluginList";
export interface PluginListInfo {
    package:string
    name:string
    type:string
    website:string
    description:string
    defaultChannel:string
    logo:string
}

export function PluginListPage() {
    const [api, setApi] = useState('https://repo.itxtech.org')
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
        <Container maxWidth="lg">
            <Grid container spacing={4}>
                <Grid item sm={12}>
                    <MetadataInfo {...metadata} api={api} setApi={setApi}></MetadataInfo>
                </Grid>

                <Grid item sm={12}>
                    <PluginList list={pluginData}></PluginList>
                </Grid>
            </Grid>
        </Container>
    </>
}

export default PluginListPage