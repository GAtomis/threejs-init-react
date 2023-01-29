/*
 * @Author: Gavin 850680822@qq.com
 * @Date: 2022-11-25 14:05:49
 * @LastEditors: GAtomis 850680822@qq.com
 * @LastEditTime: 2023-01-30 00:44:22
 * @FilePath: \workspace\three-admin-react\src\main.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
//初始化样式
import 'reset-css'
//ui
// import '@/styles/global.scss'
import "@/styles/global.scss"
//引入全局
import App from './App'

import Router from '@/router'
import { BrowserRouter } from 'react-router-dom'

//状态管理
import {Provider} from "react-redux"
import store from '@/store/index'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // 严格模式}}
  /* <React.StrictMode> */
  /* 新对象方式引入路由 */
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  /* 传统方式 */
  /* <Router></Router> */

  /* </React.StrictMode> */



)
