<!--
 * @Author: Gavin 850680822@qq.com
 * @Date: 2022-11-25 14:13:59
 * @LastEditors: “Gavin” “850680822@qq.com”
 * @LastEditTime: 2022-12-14 11:20:15
 * @FilePath: \workspace\three-admin-react\README.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
```
    "dev": "vite --host --port 3955 --open",
```
### 样式初始化
```
//
npm i reset-css
```


### 路由声明的方式

#### 传统路由声明
```
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom'

const baseRouter = () => (<BrowserRouter>
    <Routes  >
        <Route path="/" element={<App ></App>} >
            <Route path="/home" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
        </Route>
    </Routes>
</BrowserRouter>)
export default baseRouter
```

#### 对象路由声明方式


### react-redux 

//创建一个状态
```
const defaultState={
    num:20
}

let reducer=(state=defaultState,)=>{
    let newState= JSON.parse(JSON.stringify(state))
    return newState


}

export default reducer
```
初始化一个react-redux
```
import { legacy_createStore } from "redux";
import  reducer  from './reducer';
const store=legacy_createStore(reducer)
export default store
```
绑定一个状态
```

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
```
在组件中获取这个状态

```
import {useSelector} from 'react-redux'
const {num} = useSelector(state=>{
        return { num:state.num}
})
```

在组建修改状态

```
  const dispatch = useDispatch()
  //  dispatch({type:"add4"})
  const clickHome = () => {
    dispatch({ type: "add4", val: 10 })
  }
  return (

    <div className="layout-container" onClick={clickHome}>  home  {num}</div>

  );
```

## THREE JS
* 初始化镜头,场景,渲染器 dom,材料
* Gsap 动画渲染
* cube发生形变
* 安装调试UI界面 dat.gui


### 纹理
* 纹理旋转
* 纹理透明度
* 纹理遮挡对比度
* 纹理光线-PBR