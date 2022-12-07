/*
 * @Author: Gavin 850680822@qq.com
 * @Date: 2022-12-05 12:34:35
 * @LastEditors: Gavin 850680822@qq.com
 * @LastEditTime: 2022-12-05 15:03:15
 * @FilePath: \three-admin-react\src\store\reducer.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export type AState= {
    num: number;
}
const defaultState:AState={
    num:20
}

let reducer=(state=defaultState,action:{type:string,val:number})=>{
    let newState= JSON.parse(JSON.stringify(state)) 


    switch(action.type){
        case "add1":
        newState.num++
        break
        case "add4":
        newState.num+=action.val
        break
        default:
        break

    }
    return newState 


}

export default reducer