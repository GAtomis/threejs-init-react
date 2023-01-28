/*
 * @Author: GAtomis 850680822@qq.com
 * @Date: 2023-01-25 23:33:29
 * @LastEditors: GAtomis 850680822@qq.com
 * @LastEditTime: 2023-01-28 19:27:59
 * @FilePath: /workspace/threejs-init-react/src/views/THREE_JS/hooks/useElementSize.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */




/**
 * @description: 返回元素的长宽
 * @param {HTMLElement} dom
 * @return {*} [width,height]
 */
export default function useElementSize(dom:HTMLElement|Element ):number[]{



    return [dom.clientWidth,dom.clientHeight]
}