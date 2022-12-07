/*
 * @Author: Gavin 850680822@qq.com
 * @Date: 2022-11-26 10:27:39
 * @LastEditors: Gavin 850680822@qq.com
 * @LastEditTime: 2022-12-05 15:43:29
 * @FilePath: \three-admin-react\src\views\Home.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
// import type { AState } from '@/store/reducer'
import {RootState} from "@/store"

const App: React.FC = () => {
  const { num } = useSelector<RootState>((state) => ({
    num: state.num 
  }))
  const dispatch = useDispatch()
  //  dispatch({type:"add4"})
  const clickHome = () => {
    dispatch({ type: "add4", val: 10 })
  }
  return (

    <div className="layout-container" onClick={clickHome}>  home  {num}</div>

  );
};

export default App;