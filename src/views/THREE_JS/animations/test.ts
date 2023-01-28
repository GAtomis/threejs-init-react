/*
 * @Author: GAtomis 850680822@qq.com
 * @Date: 2023-01-25 17:41:41
 * @LastEditors: GAtomis 850680822@qq.com
 * @LastEditTime: 2023-01-28 15:47:15
 * @FilePath: /workspace/threejs-init-react/src/views/THREE_JS/animations/test.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import  * as THREE from "three"

let pastTime= Date.now()

const clock = new THREE.Clock()
export  const rotationAni  =(obj:any,time:number)=>{

    const obj3d=obj as THREE.Object3D
    // const currentTime=Date.now()
    // const deltaTime =currentTime-pastTime
    // pastTime=currentTime

    const elapsedTime= clock.getElapsedTime()
    obj3d.position.y=Math.sin(elapsedTime)*2
    obj3d.position.x=elapsedTime%10
    // console.log(elapsedTime);
    
    // obj3d.rotation.y=elapsedTime*Math.PI*1
    // obj3d.rotation.x+=0.0003*deltaTime
    // obj3d.rotation.z+=0.0003*deltaTime
    
}