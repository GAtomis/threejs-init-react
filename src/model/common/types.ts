/*
 * @Author: “Gavin” “850680822@qq.com”
 * @Date: 2022-12-15 12:39:17
 * @LastEditors: “Gavin” “850680822@qq.com”
 * @LastEditTime: 2022-12-15 12:39:33
 * @FilePath: /workspace/threejs-init-react/src/model/common/types.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export type Result <T>={
    result:T //指定类型
    code:number,
    msg:string
  }
  export type PrimaryKey ={
    id:string|number
  }
  
  
  export type PageInfo = {
    page: number
    pageSize: number
  }
  
  export type PageStruct<T> = {
    item: T
    total: number
  }

  export type DBModel = {
    id?: string | number
    createdAt?: string
    deletedAt?: string
    updatedAt?: string
  }