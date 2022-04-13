import axios from "axios";

export function requestPluginList() {
    return axios.get("https://repo.itxtech.org/packages.json")
}