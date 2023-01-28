/*
 * @Author: GAtomis 850680822@qq.com
 * @Date: 2023-01-25 22:33:32
 * @LastEditors: GAtomis 850680822@qq.com
 * @LastEditTime: 2023-01-28 15:47:45
 * @FilePath: /workspace/threejs-init-react/src/views/THREE_JS/Camera.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect } from 'react'

import module from "./styles-module/camera.module.scss"
import * as THREE from 'three'
import useElementSize from './hooks/useElementSize'
export default function Camera() {
    const dom = document.querySelector("#Content")
    const [winWidth,winHeight]= useElementSize(dom!)
    const scene = new THREE.Scene()
    const camera= new THREE.PerspectiveCamera(75,winWidth/winHeight,1,1000)


    useEffect(() => { 
        
        return () => {

        }
    }, [])


    return (
        <div className={module.body} id="Camera"></div>
    )
}
