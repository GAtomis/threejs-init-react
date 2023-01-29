/*
 * @Author: Gavin 850680822@qq.com
 * @Date: 2022-12-07 20:02:18
 * @LastEditors: GAtomis 850680822@qq.com
 * @LastEditTime: 2023-01-28 22:00:33
 * @FilePath: \workspace\threejs-init-react\src\utils\useGui.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {GUI} from "dat.gui"
import type {GUIParams} from "dat.gui"

export const  useGui=(cb:(an:GUI)=>any)=>{
    const gui=new GUI()
    return  cb(gui)   
}