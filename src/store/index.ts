/*
 * @Author: Gavin 850680822@qq.com
 * @Date: 2022-12-05 12:29:16
 * @LastEditors: Gavin 850680822@qq.com
 * @LastEditTime: 2022-12-05 17:41:32
 * @FilePath: \three-admin-react\src\store\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: Gavin 850680822@qq.com
 * @Date: 2022-12-05 12:29:16
 * @LastEditors: Gavin 850680822@qq.com
 * @LastEditTime: 2022-12-05 15:43:14
 * @FilePath: \three-admin-react\src\store\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { legacy_createStore } from "redux";
import  reducer  from './reducer';
const store=legacy_createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__?.())
export default store

export type RootState=ReturnType<typeof store.getState>