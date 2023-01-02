/*
 * @Author: GAtomis 850680822@qq.com
 * @Date: 2022-12-17 11:36:13
 * @LastEditors: GAtomis 850680822@qq.com
 * @LastEditTime: 2022-12-17 11:44:23
 * @FilePath: /workspace/threejs-init-react/src/store/modules/types.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export  interface Store <T> {
    state:T
    action:{
        [k:string]:(state:T,action:{type:string,val:any})=>void|any

    }
    asyncActions?:{

        [k:string]:(action?:{type?:string,val:any})=>void|any

    }

}