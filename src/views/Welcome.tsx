/*
 * @Author: GAtomis 850680822@qq.com
 * @Date: 2023-01-30 12:38:46
 * @LastEditors: GAtomis
 * @LastEditTime: 2023-02-04 17:17:41
 * @Description: Welcome
 */
import React, { useEffect } from 'react'
import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useGui } from "@/utils/useGui"

import gsap from 'gsap'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { Object3D } from 'three'
export default function Welcome() {

    const winWidth = window.innerWidth,
        winHeight = window.innerHeight
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, winWidth / winHeight, 0.1, 1000)
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

    let url = "./assets/25s.jpg"
    let envTexture = new THREE.TextureLoader().load(url)
    //球状包裹
    envTexture.mapping = THREE.EquirectangularReflectionMapping
    scene.background = envTexture
    scene.environment = envTexture


    loadMode()
    setLight()
    function loadMode() {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('./model/draco/gltf/');
        dracoLoader.setDecoderConfig({ type: "js" })
        const loader = new GLTFLoader()
        loader.setDRACOLoader(dracoLoader)

        loader.load("./model/xz.glb", (gltf) => {
            gltf.scene.scale.set(.1, .1, .1)
            gltf.scene.rotation.y = -Math.PI / 5
            gltf.scene.position.set(8, 0, 0)
            scene.add(gltf.scene)
            window.addEventListener("mousemove", (e: MouseEvent) => {
                let x = (e.clientX / window.innerWidth) * 2 - 1,
                    y = (e.clientY / window.innerHeight) * 2 - 1
                let timeLine = gsap.timeline()

                timeLine.to(gltf.scene.rotation, {
                    y: x, x: y, duration: 1
                })

            })



        })
        loader.load("./model/mech_drone.glb", gltf => {
            gltf.scene.scale.set(10, 10, 10)
            gltf.scene.rotation.y = Math.PI
            gltf.scene.position.set(8, -12, 0)


            scene.add(gltf.scene)
            followObject3D(gltf.scene)
            window.addEventListener("mousemove", (e: MouseEvent) => {
                let x = (e.clientX / window.innerWidth) * 2 - 1,
                    y = (e.clientY / window.innerHeight) * 2 - 1
                let timeLine = gsap.timeline()

                timeLine.to(gltf.scene.rotation, {
                    y: x + Math.PI * .9, x: y, duration: 1
                })

            })


        })
        loader.load("./model/moon.glb", gltf => {
            const moon = gltf.scene.children[0]

            for (let j = 0; j < 10; j++) {
                let moonInstance = new THREE.InstancedMesh(//@ts-ignore
                    moon.geometry,//@ts-ignore
                    moon.material,
                    100
                )

                for (let i = 0; i < 100; i++) {
                    //创建一个矩阵
                    let x = Math.random() * 1000 - 500
                    let y = Math.random() * 1000 - 500
                    let z = Math.random() * 1000 - 500
                    const moonSize = Math.random() * 20 - 8
                    let matrix = new THREE.Matrix4()
                    matrix.makeScale(moonSize, moonSize, moonSize)
                    matrix.makeTranslation(x, y, z)
                    moonInstance.setMatrixAt(i, matrix)
                }
                gsap.to(moonInstance.position, {
                    duration: Math.random() * 10 + 10,
                    z: -1000,
                    ease: "linear",
                    repeat: -1
                })
                scene.add(moonInstance)
            }
        })

    }

    let page = 0
    let timeLine2 = gsap.timeline()

    window.addEventListener("mousewheel", mousewheel)


    function mousewheel(e: any) {
        console.log(e.wheelDelta);
        if (e.wheelDelta < 0) {
            page++
            if (page > 1) {
                page = 1
            }
        }
        if (e.wheelDelta > 0) {
            page--
            if (page < 0) {
                page = 0
            }
        }
        if (!timeLine2.isActive()) {
            timeLine2.to(camera.position, {
                duration: .5,
                y: page * -12,
            })
        }

    }
    function setLight() {
        const light = new THREE.DirectionalLight(0xfffffff, 1)
        light.position.set(0, 0, 1)
        const light1 = new THREE.DirectionalLight(0xfffffff, 1)
        light.position.set(0, 0, -1)
        const light2 = new THREE.DirectionalLight(0xfffffff, 1)
        light.position.set(-1, 1, 1)



        scene.add(light).add(light1).add(light2)

    }
    function followObject3D(Object3D: any) {

        const light2 = new THREE.DirectionalLight(0xfffffff, 1)
        light2.position.set(8, -12 + 2, 0 + 5)
        light2.target = Object3D
        scene.add(new THREE.DirectionalLightHelper(light2))
    }
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
    useEffect(() => {


        //渲染dom
        const warp = document.getElementById("canvas")
        warp?.appendChild(renderer.domElement)
        /****初始化结束 */
        // //创建轨道控制器
        // controls = new OrbitControls(camera, renderer.domElement)
        // //设置控制器阻尼
        // controls.enableDamping = true
        render()
        setAxesHelper()

        return () => {

            window.removeEventListener("mousewheel", mousewheel)
        }
    }, [])

    return (

        <div>

            <div id="canvas">

            </div>
        </div>

    )
}

