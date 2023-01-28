/*
 * @Author: GAtomis 850680822@qq.com
 * @Date: 2023-01-28 16:02:05
 * @LastEditors: GAtomis 850680822@qq.com
 * @LastEditTime: 2023-01-29 02:17:09
 * @FilePath: /workspace/threejs-init-react/src/views/THREE_JS/Light.tsx
 * @Description: threejs 灯光效果
 */
import React, { useEffect } from 'react'
import * as THREE from "three"
import useElementSize from './hooks/useElementSize'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useGui } from "@/utils/useGui"
export default function Light() {

    const dom = document.querySelector("#Content")
    let [winWidth, winHeight] = useElementSize(dom!)
    winWidth += -20
    winHeight += -20
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, winWidth / winHeight, 0.01, 100)
    camera.position.set(0, 0, 10)
    scene.add(camera)




    //初始化渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    //设置渲染尺寸
    console.log(winWidth, winHeight);
    renderer.setSize(winWidth, winHeight)

    
    /* 初始化部分 */
    // const clock = new THREE.Clock()
    let controls: OrbitControls
 
    const shpere = getShpereMesh()
    const plane = getPlaneMesh()

    const directionalLight = setDirectionalLight()  
    const light = setLight()
    //设置阴影面积
    directionalLight.shadow.mapSize.set(2048,2048) 
    useGui(gui=>{
        gui.add(directionalLight.position,"x",1,50).name("平行光x")
        gui.add(directionalLight.position,"y",1,50).name("平行光y") 
        gui.add(directionalLight.position,"z",1,50).name("平行光z")
        gui.add(directionalLight.shadow,"radius",0,30).step(1).name("阴影模糊")
    }) 

    scene.add(shpere, plane)
  
    enableShowMap(renderer)

    /**
     * @description: 设置坐标轴辅助器&添加入场景
     * @return {*}
     */
    const setAxesHelper = () => {
        //添加坐标轴辅助器
        const axesHelper = new THREE.AxesHelper(5)
        //添加入场景
        scene.add(axesHelper)
    }
    /**
     * @description: 1秒60帧的回调函数
     * @param {number} time
     * @return {*}
     */
    function render  (time?: number) {
        // cube.position.z+=.01
        // time&&setMoveCube(time)
        // runClock()
        // time&&rotationAni(group,time)
        //渲染阻尼效果
        controls?.update()
        renderer.render(scene, camera)
        //渲染下一个帧数会调用render函数
        requestAnimationFrame(render)
    }

    /**
     * @description: 活着一个PBR的球体mesh
     * @return {*} 整个球体
     */
    function getShpereMesh() {
        const shpereGeometry = new THREE.SphereGeometry(1, 20, 20)
        const material = new THREE.MeshStandardMaterial()
        const mesh = new THREE.Mesh(shpereGeometry, material)
        mesh.castShadow = true
        return mesh
    }

    /**
     * @description: 获取plane的结构
     * @return {*}
     */
    function getPlaneMesh() {
        const planeGeometry = new THREE.PlaneGeometry(10, 10)
        const material = new THREE.MeshStandardMaterial()
        const mesh = new THREE.Mesh(planeGeometry, material)
        mesh.position.y = -2
        mesh.rotation.x = -Math.PI / 2
        mesh.receiveShadow = true
        return mesh

    }
    /**
     * @description: 设置直线光
     * @return {*}
     */
    function setDirectionalLight() {
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(10, 10, 10)
        directionalLight.castShadow = true
        scene.add(directionalLight);
        return directionalLight

    }
    /**
     * @description: 设置环境光
     * @return {*}
     */
    function setLight() {
        const light = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(light)
        return light

    }

    /**
     * @description: 开启渲染阴影
     * @param {THREE} render
     * @return {*}
     */
    function enableShowMap(render: THREE.WebGLRenderer) {
        render.shadowMap.enabled = true
    }


    useEffect(() => {


        //渲染dom
        const warp = document.getElementById("canvas")
        warp?.appendChild(renderer.domElement)
        /****初始化结束 */
        //创建轨道控制器
        controls = new OrbitControls(camera, renderer.domElement)
        //设置控制器阻尼
        controls.enableDamping = true
        render()
        setAxesHelper()

     


        return () => {

        }
    }, [])




    return (
        <div id="canvas"></div>
    )
}
