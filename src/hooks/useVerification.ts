/*
 * @Author: “Gavin” “850680822@qq.com”
 * @Date: 2022-12-15 13:02:09
 * @LastEditors: “Gavin” “850680822@qq.com”
 * @LastEditTime: 2022-12-15 13:49:58
 * @FilePath: /workspace/threejs-init-react/src/hooks/useVerification.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useEffect, useState } from "react";

import {getCaptchaUrl} from '@/utils/index'

/**
 * @description: 
 * @param {function} cb 监听url变化后的回掉
 * @return {*}
 */
export  default function  (cb:(url:string)=>void){
        const [codeUrl,setCodeUrl]= useState(getCaptchaUrl())
        useEffect(()=>{
            cb(codeUrl)
        },[codeUrl])
        const resetCode=()=>{
            setCodeUrl(getCaptchaUrl())
        }
        return {codeUrl,setCodeUrl,resetCode}
}