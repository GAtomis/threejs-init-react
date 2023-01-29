/*
 * @Author: Gavin 850680822@qq.com
 * @Date: 2022-11-26 10:30:41
 * @LastEditors: GAtomis 850680822@qq.com
 * @LastEditTime: 2023-01-29 13:44:39
 * @FilePath: \three-admin-react\src\router\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import App from '@/App'
import About from '@/views/THREE_JS/About'
import Home from '@/views/Home'
import Login from "@/views/Login"
import Gasp from '@/views/THREE_JS/Gsap'
import React, { lazy } from 'react'
import { BrowserRouter, HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/layout'
const AboutPage = lazy(() => import("@/views/THREE_JS/About"))
const HomePage = lazy(() => import("@/views/Home"))
const Started =lazy(()=>import("@/views/THREE_JS/Started"))
const Camera=lazy(()=>import("@/views/THREE_JS/Camera"))
const Light =lazy(()=>import("@/views/THREE_JS/Light"))
const Car =lazy(()=>import("@/views/THREE_JS/Car"))
const baseRouter = () => (<BrowserRouter>
    <Routes  >
        <Route path="/" element={<App ></App>} >

            <Route path="/" element={<Navigate to="/home" />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
        </Route>
    </Routes>
</BrowserRouter>)
export default baseRouter

const ElementWithLoading = (comp: JSX.Element) => (<React.Suspense fallback={<div>Loading。。。</div>}>    {comp}</React.Suspense>)
export const routes = [

    {
        path: '/',
        element: <Navigate to="/login" />
    },
    {
        path: '/',
        element: <Layout />,
        children:[  
              {
            path: '/about',
            element: ElementWithLoading(<AboutPage/>)
        },
        {
            path: '/home',
            element: ElementWithLoading(<HomePage/>)
        },
        {
            path: '/gasp',
            element: ElementWithLoading(<Gasp/>)
        },
        {
            path: '/started',
            element: ElementWithLoading(<Started/>)
        },
        {
            path: '/camera',
            element: ElementWithLoading(<Camera/>)
        },
        {
            path: '/light',
            element: ElementWithLoading(<Light/>)
        },
        {
            path: '/car',
            element: ElementWithLoading(<Car/>)
        },
    ]
    },
    {

        path:"/login",
        element: <Login />,
    },
    {
        path:"*",
        element: <Navigate to="/about" />
    }
 
]