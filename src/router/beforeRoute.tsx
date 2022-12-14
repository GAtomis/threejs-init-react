/*
 * @Author: “Gavin” “850680822@qq.com”
 * @Date: 2022-12-15 00:00:39
 * @LastEditors: “Gavin” “850680822@qq.com”
 * @LastEditTime: 2022-12-15 00:18:13
 * @FilePath: /workspace/threejs-init-react/src/router/beforeRoute.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { useEffect } from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
function ToLogin(){
    const navigateTo=useNavigate()
    useEffect(()=>{
        
        navigateTo('/login')
    },[])
    return <div></div>

}

function ToHome(){
    return <div></div>
}


export  function beforeRoute (){
    
    const router=useLocation()
    const currentPathName= router.pathname
    const token =localStorage.getItem("token")
    if (currentPathName =='login'&&token ) return <ToHome></ToHome>
    if(currentPathName!='login'&&!token) return <ToLogin></ToLogin>

}