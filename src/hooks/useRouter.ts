/*
 * @Author: Gavin 850680822@qq.com
 * @Date: 2022-12-01 19:33:36
 * @LastEditors: Gavin 850680822@qq.com
 * @LastEditTime: 2022-12-01 21:28:07
 * @FilePath: \three-admin-react\src\hooks\useRouterFilter.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


type RouterMap={

    children?:RouterMap[]

}

/**
 * @description: 通过路由题遍历获得结果
 * @param {T[]} routes 遍历路由
 * @param {*} cb  回调函数
 * @param {T} root 可选父节点
 * @return {*}
 */
export const useRouterFilter= <T extends  RouterMap,R = T>(routes:T[], cb:(children:T,parents?:T)=>R,root?:T):R[]=>{
  // 关键筛选  第一个参数所有拥有的所有路由权限，第二参数权限路由
  // res是筛选完的路由
  let res: R[] = []
  // 所有异步路由遍历
  routes.forEach((route) => {
    // 解构
    const tmp = { ...route }

    // 当前路由组是否包含roles
    if (tmp.children) {
      let result:R[]
      result = useRouterFilter<T,R>(tmp.children as T[],cb,tmp)
      res = [...res, ...result]
    } else {
      let result:R
      result= cb(tmp,root)
      result&&res.push(result)
    }
  })

  return res
}
 