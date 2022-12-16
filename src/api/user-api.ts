/*
 * @Author: “Gavin” “850680822@qq.com”
 * @Date: 2022-12-15 12:37:55
 * @LastEditors: “Gavin” “850680822@qq.com”
 * @LastEditTime: 2022-12-15 17:39:17
 * @FilePath: /workspace/threejs-init-react/src/api/user-api.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import http from "@/utils/request-api"
import type {Login,Register,UserInfo}from "@/model/user/types"
import type {Result} from "@/model/common/types"

export function login(data:Login) {
  return http.request<any,Result<{token:string}>>({
    url:"base/login",
    method:"POST",
    data
  })
}
export function register(data:Register) {
  return http.request<any,Result<string>>({
    url:"base/register",
    method:"POST",
    data
  })
}
export function getUserInfo() {
  return http.request<any,Result<UserInfo>>({
    url:"user/userInfo",
  })
}
export function createUserInfo(data:UserInfo) {
  return http.request<any,Result<string>>({
    url:"user/addUserInfo",
    method:"POST",
    data
  })
}
export function updateUserInfo(data:UserInfo) {
  return http.request<any,Result<string>>({
    url:"user/userInfo",
    method:"PUT",
    data
  })
}



//姓名检索
 export function getInfoListByName (data:{searchKey:string}) {
  return http.request<any,Result<UserInfo[]>>({
    url:"user/getInfoListByName",
    method:"POST",
    data
  })
}