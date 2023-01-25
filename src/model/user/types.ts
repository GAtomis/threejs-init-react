/*
 * @Author: “Gavin” “850680822@qq.com”
 * @Date: 2022-12-15 12:38:41
 * @LastEditors: “Gavin” “850680822@qq.com”
 * @LastEditTime: 2022-12-15 12:38:52
 * @FilePath: /workspace/threejs-init-react/src/model/user/types.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { DBModel } from '@/model/common/types'
export type User = {
  avatar: string
  id?: number
  username: string
  name: string
  gender: number
  [key: string]: any

}
export type Login = {
  username: string,//用户名
  password: string,//密码
  code?: string//验证码
}

export type Register = {
  username: string,//用户名
  password: string,//密码
  code?: string//验证码
}


export type UserInfo = {
  name: string
  company: string
  catchPhrase: string
  jobType: string
  avatar: string
  [key: string]: any
} & DBModel