/*
 * @Author: Gavin 850680822@qq.com
 * @Date: 2022-11-26 10:28:37
 * @LastEditors: Gavin 850680822@qq.com
 * @LastEditTime: 2022-12-07 16:53:36
 * @FilePath: \three-admin-react\src\views\About.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


import { useEffect } from "react"
import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import { RGBA_ASTC_5x4_Format } from "three"
function About() {

    /* 初始化部分 */
    const winWidth = window.innerWidth * .8,
        winHeigh = window.innerHeight * .8
    //构建场景
    const scene = new THREE.Scene()
    //创建相机
    const camera = new THREE.PerspectiveCamera(75, winWidth / winHeigh, 0.1, 1000)
    //调整相机位置 
    camera.position.set(0, 0, 10)
    //场景中添加相机
    scene.add(camera)
    //创建几何体 长宽深
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
    //基础材质
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: "#FFD700" })
    //根据几何体和材质创建物体
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
    //将几何体渲染到场景中 
    scene.add(cube)
    //初始化渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    //设置渲染尺寸
    renderer.setSize(winWidth, winHeigh)
    /* 初始化部分 */
    const clock = new THREE.Clock()
    let controls:OrbitControls
    useEffect(() => {
        //渲染dom
        const warp = document.getElementById("warp-about")
        warp?.appendChild(renderer.domElement)
        /****初始化结束 */
        //创建轨道控制器
        controls = new OrbitControls(camera, renderer.domElement)
        //设置控制器阻尼
        controls.enableDamping=true
        render()
        setAxesHelper()
        setScale()
        setRotation()
        runGsap()

        // setTimeout(()=>{
        //   // cube.position.set(5,0,0)

        // },500)

    }, [])
    window.addEventListener("resize",()=>{
        console.log("尺寸发生改变");
        
    })


    /**
     * @description: 轨道控制器查看物体
     * @param {number} time
     * @return {*}
     */
    const render = (time?: number) => {
        // cube.position.z+=.01
        // time&&setMoveCube(time)
        // runClock()
        //渲染阻尼效果
        controls?.update()
        renderer.render(scene, camera)
        //渲染下一个帧数会调用render函数
        requestAnimationFrame(render)
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
     * @description: 设置物体的移动
     * @param {number} time
     * @return {*}
     */
    const setMoveCube = (time: number) => {
        let t = time / 1000

        cube.position.x = (t * 1) % 5
        if (cube.position.x > 5) {
            cube.position.x = 0
        }
    }

    /**
     * @description: 设置缩放和放大
     * @return {*}
     */
    const setScale = () => {
        cube.scale.set(2, 2, 1)
    }

    /**
     * @description: 控制素材旋转
     * @return {*}
     */
    const setRotation = () => {
        //math.PI等于180度 XZY旋转顺序
        cube.rotation.set(Math.PI / 4, 0, 0, "XYZ")
    }
    //运行时钟获得当前时间
    const runClock = () => {
        const deltaTime = clock.getDelta()
        console.log(deltaTime);
        return deltaTime

    }
    //运行gasp 
    const runGsap = () => {
        gsap.to(cube.position, {
            //坐标轴距离
            x: 5,
            //时间
            duration: 5,
            //延迟
            delay:2,
            //动画效果
            ease: "power1.inOut",
            onComplete: () => console.log("动画完成"),
            onStart: () => console.log("动画开始"), 
            //循环次数
            repeat: 2,
            yoyo:true
        })
        gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, ease: "power1.inOut", onComplete: () => console.log("动画完成"), onStart: () => console.log("动画开始") })
    }
    return (
        <div id="warp-about">

        </div>
    )
}
export default About