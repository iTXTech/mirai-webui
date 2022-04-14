import axios from "axios";

export function requestPluginList(api:string) {
    return axios.get(api + "/packages.json")
}