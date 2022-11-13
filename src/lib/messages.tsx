/**
 * 返回消息的Key对应的渲染组件
 */
export const resolverKeyMap = {

}

export interface SoyuzMessage {
    key:string
}

export const KEY_SOYUZ_RUN_COMMAND = "soyuz-run-command"
export interface SoyuzCommandMessage extends SoyuzMessage {
    result:string
    output?:Array<string>
}


export const KEY_SOYUZ_INPUT_COMMAND = "soyuz-input-command"
export interface InputCommandMessage extends SoyuzMessage {
    result:string
    input:string
}
