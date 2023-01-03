/*
 * @Description: axios
 * @Author: Gavin
 * @Date: 2022-08-02 15:04:30
 * @LastEditTime: 2022-12-15 01:28:20
 * @LastEditors: “Gavin” “850680822@qq.com”
 */
import axios, { AxiosResponse, AxiosInstance ,AxiosRequestHeaders} from "axios"
import {baseUrlwhiteList,successCode} from './index'

const rootPath = import.meta.env.VITE_BASE_API as string
import { message } from 'antd';
const instance = axios.create({
  baseURL: rootPath
});
instance.interceptors.request.use((config) => {

  if(baseUrlwhiteList.some(item=>config.baseURL?.includes(item))) return config
    const token =sessionStorage.getItem('token')
  config.headers!.Authorization=token


  return config
})
instance.interceptors.response.use((response) => {

  

  const res = response.data
  //权限无权限错误代码跳转error页面
  if (res.code === 44) {
    // router.replace({ path: '/error', query: { errMsg: res.msg } })
    // error(res.message||res.msg)
    return Promise.reject(res)
  }
  //非0和200返回异常
  if (res && !successCode.includes(res.code.toString())) {
    console.log(res.code);
    // error(res.message||res.msg)

    message.error(res.message || res.msg||'返回码异常Error')


    return Promise.reject(new Error(res.message || res.msg||'返回码异常Error'))
    
  } else {
    return res
  }

}, error => {
  console.log('err' + error) // for debug

  message.error(error.message || error.msg||'返回码异常Error')
  return Promise.reject(error)
}
)

export default instance