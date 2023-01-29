/*
 * @Author: GAtomis 850680822@qq.com
 * @Date: 2023-01-28 16:02:05
 * @LastEditors: GAtomis 850680822@qq.com
 * @LastEditTime: 2023-01-29 13:26:27
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

    //平行光
    // const directionalLight = setDirectionalLight()  



    const light = setLight()
    //聚光灯 
    const spotLight = setSpotLight()



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
    function render(time?: number) {
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
        const planeGeometry = new THREE.PlaneGeometry(30, 30)
        const material = new THREE.MeshStandardMaterial()
        const mesh = new THREE.Mesh(planeGeometry, material)
        mesh.position.y = -2
        mesh.rotation.x = -Math.PI / 2
        mesh.receiveShadow = true
        return mesh

    }
    /**
     * @description: 设置平行光
     * @return {*}
     */
    function setDirectionalLight() {
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(10, 10, 10)
        directionalLight.castShadow = true
        scene.add(directionalLight);
        useGui(gui => {
                //设置阴影面积
            directionalLight.shadow.mapSize.set(2048, 2048)
            gui.add(directionalLight.position, "x", 1, 50).name("平行光x")
            gui.add(directionalLight.position, "y", 1, 50).name("平行光y")
            gui.add(directionalLight.position, "z", 1, 50).name("平行光z")
            gui.add(directionalLight.shadow, "radius", 0, 30).step(1).name("阴影模糊")
            gui.add(directionalLight.shadow.camera, "near", 0, 40, .1).onChange(() => {
                //利用正交摄像机来做阴影处理
                directionalLight.shadow.camera.updateProjectionMatrix()
            }).name("阴影的near端")
        })
        return directionalLight

    }

    /**
     * @description: 聚光灯
     * @return {*}
     */
    function setSpotLight() {
        const spotLight = new THREE.SpotLight(0xffffff, 1)
        spotLight.position.set(5, 5, 5)
        spotLight.castShadow = true
        spotLight.shadow.radius=20
        spotLight.target=shpere
        spotLight.shadow.mapSize.set(4096,4096)
        spotLight.angle=Math.PI/6
        spotLight.distance=0
        spotLight.penumbra=0
        renderer.physicallyCorrectLights=true
        spotLight.decay=0
        useGui(gui=>{
            gui.add(shpere.position, "x", 0, 50,.5).name("球体的x位置")
            gui.add(spotLight,"angle",0,Math.PI/2,.1).name("聚光灯角度")
            gui.add(spotLight,"distance",0,40,.1).name("聚光灯衰减距离")
            gui.add(spotLight,"penumbra",0,1,.1).name("聚光灯衰减效果")
            gui.add(spotLight,"decay",0,2,.1).name("聚光灯沿灯光距离变暗")
        })
        scene.add(spotLight)
        return spotLight
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
