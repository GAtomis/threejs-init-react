/*
 * @Description: axios
 * @Author: Gavin
 * @Date: 2022-08-02 15:04:30
 * @LastEditTime: 2022-12-15 01:28:20
 * @LastEditors: “Gavin” “850680822@qq.com”
 */
import axios, { AxiosResponse, AxiosInstance ,AxiosRequestHeaders} from "axios"
import {baseUrlwhiteList,successCode} from './index'

import getMessage  from '@/hooks/useMessage'
const rootPath = import.meta.env.VITE_BASE_API as string

const {success,error}=getMessage()
const instance = axios.create({
  baseURL: rootPath
});
instance.interceptors.request.use((config) => {

  if(baseUrlwhiteList.some(item=>config.baseURL?.includes(item))) return config
    const token =localStorage.getItem('token')
  config.headers!.Authorization=token


  console.log("请求");
  return config
})
instance.interceptors.response.use((response) => {

  

  const res = response.data
  //权限无权限错误代码跳转error页面
  if (res.code === 44) {
    // router.replace({ path: '/error', query: { errMsg: res.msg } })
    error(res.message||res.msg)
    return Promise.reject(res)
  }
  //非0和200返回异常
  if (res && !successCode.includes(res.code.toString())) {
    console.log(res.code);
    error(res.message||res.msg)
    return Promise.reject(new Error(res.message || '返回码异常Error'))
    
  } else {
    return res
  }

}, error => {
  console.log('err' + error) // for debug

  error(error)
  return Promise.reject(error)
}
)

export default instance