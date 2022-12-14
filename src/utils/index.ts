/*
 * @Author: “Gavin” “850680822@qq.com”
 * @Date: 2022-12-15 00:28:03
 * @LastEditors: “Gavin” “850680822@qq.com”
 * @LastEditTime: 2022-12-15 00:28:05
 * @FilePath: /workspace/threejs-init-react/src/utils/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const getCaptchaUrl=()=>import.meta.env.VITE_BASE_API + 'base/code'+`?v=${Math.random()}`



export const baseUrlwhiteList=['upload']
export const successCode=['0','200','image_repeated','success']
