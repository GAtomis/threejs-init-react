/*
 * @Author: Gavin 850680822@qq.com
 * @Date: 2022-11-26 10:27:39
 * @LastEditors: GAtomis 850680822@qq.com
 * @LastEditTime: 2022-12-16 23:56:47
 * @FilePath: \three-admin-react\src\views\Home.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
// import type { AState } from '@/store/reducer'
import {RootState} from "@/store"

const App: React.FC = () => {
  const { root } = useSelector<RootState>((state) => ({
    root: state.appReducer.username 
  }))
  const dispatch = useDispatch()
  //  dispatch({type:"add4"})
  const clickHome = () => {
    dispatch({ type: "setUsername", val: "我的对手" })
  }
  return (

    <div className="layout-container" onClick={clickHome}>  home  {root}</div>

  );
};

export default App;