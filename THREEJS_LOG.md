<!--
 * @Author: GAtomis 850680822@qq.com
 * @Date: 2023-01-20 13:27:51
 * @LastEditors: GAtomis 850680822@qq.com
 * @LastEditTime: 2023-01-29 00:24:20
 * @FilePath: /workspace/threejs-init-react/THREEJS_LOG.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

## Threejs 学习笔记

## THREE基础

### 场景
> 给当前环境一个3D渲染的环境

```
const scene = new THREE.Scene()
```
### 渲染体 
> 需要的渲染一个3D视图的几何体
cube是由素材和几何体组成的
```
//官方文档提供很多设定的几何体
const geometry = new THREE.BoxGeometry(1,1,1)
//官方文档提供的素材的类,比如可以导入很多素材,例如纹理图片等
const material = new THREE.MeshBasicMaterial({color:#eeeee})
//渲染体
const cube = new THREE.Mesh(geometry,material)
//加入场景
scene.add(cube)
```


### 视角
>  在THREEJS视角内需要模拟眼睛去观察这个3D几何体
```
const height= 600,
    width=800 
//这里需要两个参数 
//默认第一参数为视角类似眼睛的视距一般设置75deg
//第二个参数 决定我要做的场景长宽比 一般会用之前场景的宽/长
const camera=new THREE.PerspectiveCamera(75,width/height)
//将摄像机加入场景
scene.add(camera)
```

### 渲染器
> 渲染器是将我们以上的场景通过一些方式例如webgl,css3等方式渲染
```
//获得canvas DOM对象
const canvas =document.querySelector(".canvas")
//添加渲染器
const renderer = new THREE.WebGLRenderer({
        canvas,
})
//设置渲染器大小
renderer.setSize(width,height)
```


### 初始化步骤
* 初始化镜头,场景,渲染器 dom,材料
* Gsap 动画渲染
* cube发生形变
* 安装调试UI界面 dat.gui


### 纹理
* 纹理旋转
* 纹理透明度
* 纹理遮挡对比度
* 纹理光线-PBR


### 阴影
#### 初始化
PBR素材
1. 材质要满足能够对光照有反应
2. 设置渲染器开启阴影的计算 renderer.shadowMap = true
3. 设置光照投射阴影 directional
4. 设置物体投射阴影
5. 设置物体接受阴影  
#### 阴影模糊
