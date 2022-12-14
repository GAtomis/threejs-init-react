/*
 * @Author: Gavin 850680822@qq.com
 * @Date: 2022-11-25 14:05:49
 * @LastEditors: “Gavin” “850680822@qq.com”
 * @LastEditTime: 2022-12-15 01:19:03
 * @FilePath: \workspace\three-admin-react\src\App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Comp from '@/components/Comp'
import { Outlet,Link, useRoutes } from 'react-router-dom'
import {routes} from '@/router/index'
// import Notifcations from   "@/components/Notifcations"

           
function App() {
  const [count, setCount] = useState(0)
  const routerView =useRoutes(routes)
  return (
    <div className="App">
      {/* <Notifcations></Notifcations> */}
        {routerView}
      {/* <Outlet/> */}
    </div>
  )
}

export default App
