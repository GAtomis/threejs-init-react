/*
 * @Author: GAtomis 850680822@qq.com
 * @Date: 2023-01-28 16:02:05
 * @LastEditors: GAtomis 850680822@qq.com
 * @LastEditTime: 2023-01-30 01:43:16
 * @FilePath: /workspace/threejs-init-react/src/views/THREE_JS/Light.tsx
 * @Description: threejs 灯光效果
 */
import React, { useEffect } from 'react'
import * as THREE from "three"
import useElementSize from './hooks/useElementSize'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useGui } from "@/utils/useGui"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import gsap from 'gsap'
export default function Car() {

    const dom = document.querySelector("#Content")
    let [winWidth, winHeight] = useElementSize(dom!)
    winWidth += -20
    winHeight += -20
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, winWidth / winHeight, 0.1, 100)
    camera.position.set( 4.25, 1.4, - 4.5 );
    scene.add(camera)
    const grid = addGridHelper()
    loadCarModel()


    //初始化渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setAnimationLoop( render );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;
    //设置渲染尺寸
    // console.log(winWidth, winHeight);
    renderer.setSize(winWidth, winHeight)

    /* 初始化部分 */
    // const clock = new THREE.Clock()
    let controls: OrbitControls

    const wheels: any[] = [];





    /**
     * @description:  初始化场景
     * @param {THREE} render
     * @param {THREE} scene
     * @return {*}
     */
    function initScene(render: THREE.WebGLRenderer, scene: THREE.Scene) {

        render.setClearColor("#000")

        scene.background = new THREE.Color(0x333333);
        scene.environment = new RGBELoader().load('model/equirectangular/venice_sunset_1k.hdr');
        scene.environment.mapping = THREE.EquirectangularReflectionMapping;
        scene.fog = new THREE.Fog(0x333333, 10, 15);


    }

    function addGridHelper() {

        const grid = new THREE.GridHelper(20, 40, 0xffffff, 0xffffff);
        grid.material.opacity = 0.2;
        grid.material.depthWrite = false;
        grid.material.transparent = true;
        scene.add(grid);
        return grid

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
        const times = - performance.now() / 1000;
        for (let i = 0; i < wheels.length; i++) {

            if ([0, 1].includes(i)) {


                // wheels[i].rotateOnAxis(new THREE.Vector3(1,0,0), 0.01);
                // console.log(wheels[i].position);
                wheels[i].rotation.x = times * Math.PI * 2;


            } else {
                wheels[i].rotation.x = times * Math.PI * 2;
            }



        }

        // runClock()
        // time&&rotationAni(group,time)
        //渲染阻尼效果
        controls?.update()
        renderer.render(scene, camera)
        //渲染下一个帧数 会调用render函数
        // requestAnimationFrame(render)
    }


    //添加汽车模型
    function loadCarModel() {
        const shadow = new THREE.TextureLoader().load('./model/ferrari_ao.png');
        const loader = new GLTFLoader()
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('./model/draco/gltf/');
        loader.setDRACOLoader(dracoLoader)
        loader.load("./model/ferrari.glb", (gltf) => {


            const bodyMaterial = new THREE.MeshPhysicalMaterial({
                color: 0xff0000, metalness: 1.0, roughness: 0.5, clearcoat: 1.0, clearcoatRoughness: 0.03, sheen: 0.5
            });

            const detailsMaterial = new THREE.MeshStandardMaterial({
                color: 0xffffff, metalness: 1.0, roughness: 0.5
            });

            const glassMaterial = new THREE.MeshPhysicalMaterial({
                color: 0xffffff, metalness: 0.25, roughness: 0, transmission: 1.0
            });
            const carModel = gltf.scene.children[0];


            carModel.getObjectByName('body')!.material = bodyMaterial;

            carModel.getObjectByName('rim_fl').material = detailsMaterial;
            carModel.getObjectByName('rim_fr').material = detailsMaterial;
            carModel.getObjectByName('rim_rr').material = detailsMaterial;
            carModel.getObjectByName('rim_rl').material = detailsMaterial;
            carModel.getObjectByName('trim').material = detailsMaterial;

            carModel.getObjectByName('glass').material = glassMaterial;

            wheels.push(
                carModel.getObjectByName('wheel_fl'),
                carModel.getObjectByName('wheel_fr'),
                carModel.getObjectByName('wheel_rl'),
                carModel.getObjectByName('wheel_rr')
            );

            // shadow
            const mesh = new THREE.Mesh(
                new THREE.PlaneGeometry(0.655 * 4, 1.3 * 4),
                new THREE.MeshBasicMaterial({
                    map: shadow, blending: THREE.MultiplyBlending, toneMapped: false, transparent: true
                })
            );
            mesh.rotation.x = - Math.PI / 2;
            mesh.renderOrder = 2;
            carModel.add(mesh);

            scene.add(carModel);
                console.log(carModel);
                
            useGui(gui => {
                gui.add(carModel.position, "z", -2, 2, .02).name("距离")
                gui.add(wheels[0].rotation, "z", -Math.PI / 4, Math.PI / 4, Math.PI / 76).name("方向盘").onChange((val) => {

                    wheels[1].rotation.z = val
                  const fangxiangpan=carModel.getObjectByName("steering_wheel")
                  fangxiangpan.rotation.y=-val*4*2
                   

                })
            
                console.log(bodyMaterial.color);
                
                const params = {

                    color1:"#ff0000",
                    color2:"#ffffff",
                    color3:"#ffffff"
                }
                gui.addColor(params, "color1").onChange((val: any) => {
                    console.log(val);
                    bodyMaterial.color.set(val);
                }).name("车身")
            
                gui.addColor(params, "color2").onChange((val: any) => {
                    console.log(val);
                    detailsMaterial.color.set(val);
                }).name("细节")
          
                gui.addColor(params, "color3").onChange((val: any) => {
                    console.log(val);
                    glassMaterial.color.set(val);
                }).name("玻璃")
                // gui.add(wheels[1].rotation, "y", 0, -10, .1).name("向右")
            })
            carModel.position.z=4
            gsap.to(carModel.position, {
                //坐标轴距离
                z: -4,
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
    


        })




    }
    //
    function setLight() {
        let val = .4
        const light1 = new THREE.DirectionalLight(0xffffff, val)
        light1.position.set(0, 0, 10)
        const light2 = new THREE.DirectionalLight(0xffffff, val)
        light2.position.set(0, 0, -10)
        const light3 = new THREE.DirectionalLight(0xffffff, val)
        light3.position.set(10, 0, 10)
        const light4 = new THREE.DirectionalLight(0xffffff, val)
        light4.position.set(-10, 0, 10)
        const light5 = new THREE.DirectionalLight(0xffffff, val)
        light5.position.set(0, 10, 0)
        const light6 = new THREE.DirectionalLight(0xffffff, val)
        light6.position.set(5, 10, 0)
        scene.add(light1).add(light2).add(light3).add(light4).add(light5).add(light6)
    }

    function rotateAroundWorldaxis(object: THREE.Object3D, axis: THREE.Vector3, radians: number) {

        let rotWorldMatrix = new THREE.Matrix4();

        rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);

        rotWorldMatrix.multiply(object.matrix);

        object.matrix = rotWorldMatrix;

        object.rotation.setFromRotationMatrix(object.matrix);

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
        initScene(renderer, scene)
        render()
        setAxesHelper()
        setLight()





        return () => {

        }
    }, [])




    return (
        <div id="canvas"></div>
    )
}
