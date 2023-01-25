/*
 * @Author: “Gavin” “850680822@qq.com”
 * @Date: 2022-12-11 23:46:13
 * @LastEditors: GAtomis 850680822@qq.com
 * @LastEditTime: 2022-12-20 11:04:01
 * @FilePath: /workspace/threejs-init-react/src/store/modules/app.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import type {Store}from '../types'
import type {Login,UserInfo} from '@/model/user/types'

export type UserStore ={
    token:string
    userInfo:UserInfo

}
const store={
    state:{
        token:window.sessionStorage.getItem('token'),
        userInfo:{}
    },
    action:{
        setToken(newState:UserStore,action:{type:string,val:string}){
            newState.token=action.val
            window.sessionStorage.setItem('token',action.val)
        }, 
        setUserInfo(newState:UserStore,action:{type:string,val:any}){
            newState.userInfo=action.val
        }
    }, 
    asyncActions:{
        asyncLogin(action:{type?:string,val:Login}){
            return  async  (disp:Function)=>{
                    // await login (action.val)
                    disp({type:'setToken',val:'123'})
                  
            } 
        }  
    }

}


export default store

// interface IStore {

//     state:{
//         [key:string]:any
//     }
//     action:{
//         [key:string]:any
//     }
//     actionName?:any
// }

// class Store implements IStore {
//     state
//     constructor(state:any,action:any){

//         this.state={



//         }
//         this.action={



//         }

//     }
//     set action(v:any){

        

        
//     }
//     get action(){

//         return this.action
//     }
    
//     get actionName(){
//         let res:{ [key: string]: string}={}
//           Object.keys(this.action).forEach(item=>{
//             res[item]=item
//           })
        
    
//         return res

//     }
 
  


// }