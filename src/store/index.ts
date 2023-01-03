/*
 * @Author: “Gavin” “850680822@qq.com”
 * @Date: 2022-12-11 23:46:13
 * @LastEditors: GAtomis 850680822@qq.com
 * @LastEditTime: 2022-12-16 23:45:44
 * @FilePath: /workspace/threejs-init-react/src/store/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */



import { combineReducers, legacy_createStore,compose,applyMiddleware } from "redux";
import reduxThunk from  'redux-thunk'
import  appReducer  from './modules/app/reducer';
import  userReducer  from './modules/user/reducer';


const reducers=combineReducers({appReducer,userReducer})
//无redux-thunk
// const store=legacy_createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__?.())

//添加redux-thunk
let composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}):compose
const store=legacy_createStore(reducers,composeEnhancers(applyMiddleware(reduxThunk)))

export default store

export type RootState=ReturnType<typeof store.getState>