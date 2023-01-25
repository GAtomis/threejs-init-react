/*
 * @Author: Gavin 850680822@qq.com
 * @Date: 2022-11-25 14:05:49
 * @LastEditors: “Gavin” “850680822@qq.com”
 * @LastEditTime: 2022-12-15 01:19:03
 * @FilePath: \workspace\three-admin-react\src\App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


import { Outlet, Link, useRoutes } from 'react-router-dom'
import { routes } from '@/router/index'
// import Notifcations from   "@/components/Notifcations"
// import store from '@/store/index'
import { useEffect } from 'react';
import BeforeRoute from './router/beforeRoute'; 

function App() {
  // const routerView = useRoutes(routes)

  // const [messageApi, contextHolder] = message.useMessage();
  // useEffect(() => {
  //   // 监听state的变化
  //   let unsubscribe = store.subscribe(() => {
  //     console.log('监听中..', store.getState())
  //     const message = store.getState().messageReducer as AppState
  //     message.visible && store.dispatch({type:"setVisible",val:0})&& messageApi?.[message.type]?.(message.words) 
  //     // messageApi.

  //   })
  //   return () => {
  //     // 取消监听
  //     unsubscribe();
  //   }
  // }, [])
  return (
    <div className="App">

      {/* <Notifcations></Notifcations> */}
      <BeforeRoute></BeforeRoute>
      {/* <Outlet/> */}
    </div>
  )
}

export default App
