
export interface SoyuzConnectionInfo {
    id:string
    name:string
    address:string
    port:string
    token:string
    addTime:Date
}

const KEY_SOYUZ_CONNECTIONS = "soyuz_connections"

export function getConnectionsFromStorage():Array<SoyuzConnectionInfo> {
    const res = window.localStorage.getItem(KEY_SOYUZ_CONNECTIONS)
    if(res==="" || !res) return []
    else {
        try {
            const arr = JSON.parse(res as string)
            if(!(arr instanceof Array)) throw new Error()
            return arr
        }catch (e) {
            return []
        }
    }
}

export function setConnectionsToLocalStorage(arr:Array<SoyuzConnectionInfo>) {
    const res = JSON.stringify(arr)
    window.localStorage.setItem(KEY_SOYUZ_CONNECTIONS, res)
}

export function addSoyuzConnection(conn:SoyuzConnectionInfo) {
    const arr = getConnectionsFromStorage()
    if(conn.id===""||!conn.id) {
        conn.id = crypto.randomUUID()
    }
    arr.push(conn)
    setConnectionsToLocalStorage(arr)
}

export function deleteSoyuzConnectionBy(predicate: (value: SoyuzConnectionInfo, index: number, array: SoyuzConnectionInfo[]) => unknown) {
    const arr = getConnectionsFromStorage()
    const res = arr.filter(predicate)
    setConnectionsToLocalStorage(res)
}

export function deleteSoyuzConnectionByName(connName: string) {
    deleteSoyuzConnectionBy((val)=>val.name!==connName)
}

export function deleteSoyuzConnectionByID(ID: string) {
    deleteSoyuzConnectionBy((val)=>val.id!==ID)
}