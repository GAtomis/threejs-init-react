/*
 * @Author: “Gavin” “850680822@qq.com”
 * @Date: 2022-12-11 23:46:13
 * @LastEditors: GAtomis 850680822@qq.com
 * @LastEditTime: 2022-12-16 23:56:18
 * @FilePath: /workspace/threejs-init-react/src/store/modules/app.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

type appState ={
        token:string
        username:string
        avatar:string

}
const store={
    state:{
        token:"",
        username:"root",
        avatar:""
    },
    action:{
        setToken(newState:appState,action:{type:string,val:any}){
            newState.token="appdssds"
            
            
        },
        setUsername(newState:appState,action:{type:string,val:any}){
            newState.username=action.val

        }
    },
    actionName:{
        
    }
}


export default new Proxy(store,{

    get( target:any,property:string,receiver){
        if(property=='actionName'){
        let res:{ [key: string]: string}={}
          Object.keys(target['action']).forEach(item=>{
            res[item]=item
          })  
        return res
        
        }
        return Reflect.get(target,property,receiver);
        
        

    }
})

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