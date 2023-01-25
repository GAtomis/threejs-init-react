/*
 * @Author: “Gavin” “850680822@qq.com”
 * @Date: 2022-12-15 00:00:39
 * @LastEditors: “Gavin” “850680822@qq.com”
 * @LastEditTime: 2022-12-15 00:18:13
 * @FilePath: /workspace/threejs-init-react/src/router/beforeRoute.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { useEffect } from 'react'
import { useLocation, useNavigate, useRoutes } from 'react-router-dom'
import { message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { routes } from '@/router/index'
import type { RootState } from "@/store"
import { getUserInfo } from '@/api/user-api'
import useAsyncEffect from '@/hooks/useAsyncEffect'
function ToLogin() {
    const navigateTo = useNavigate()
    useEffect(() => {
        message.error('The identity information is invalid, please log in again')
        navigateTo('/login')
    }, [])
    return <div></div>

}
function ToHome() {
    const navigateTo = useNavigate()
    useEffect(() => {
        message.success('System logged in')
        navigateTo('/home')
    }, [])
    return <div></div>
}
 function ToUserInfo() {
    const dispatch = useDispatch()
    // const routerView = useRoutes(routes)
        const router = useLocation()

    const currentPathName = router.pathname
    const navigateTo = useNavigate()
    useAsyncEffect( async () => {
        try {
            const { result } = await getUserInfo()
            dispatch({ type: 'setUserInfo', val: result })
            navigateTo(currentPathName)   
        } catch (error) {
            navigateTo('/login')
        }
    }, [])
    return <div></div>
 

}


export default function useBeforeRoute() {
    console.log("执行了一遍");
    
    const routerView = useRoutes(routes)
    const router = useLocation()
    const currentPathName = router.pathname
    const token = sessionStorage.getItem("token")
    const { name } = useSelector((state: RootState) => ({
        name: state.userReducer.userInfo.name
    }))
    if (currentPathName == '/login' && token) return <ToHome></ToHome>
    if (currentPathName != '/login' && !token) return <ToLogin></ToLogin>
    if (currentPathName != '/login' && !name) return <ToUserInfo></ToUserInfo>
    return routerView

}