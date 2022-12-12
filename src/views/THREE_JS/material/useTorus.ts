/*
 * @Author: “Gavin” “850680822@qq.com”
 * @Date: 2022-12-12 16:27:29
 * @LastEditors: “Gavin” “850680822@qq.com”
 * @LastEditTime: 2022-12-12 17:16:39
 * @FilePath: /workspace/threejs-init-react/src/views/THREE_JS/material/useTorus.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import * as THREE from "three"


export default function useTorus(guiParams:any) {


    const geometry = new THREE.TorusGeometry(guiParams.radius, guiParams.tube, guiParams.radialSegments, guiParams.tubularSegments);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    return {geometry,material,guiParams}

}