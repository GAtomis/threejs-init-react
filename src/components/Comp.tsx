/*
 * @Author: Gavin 850680822@qq.com
 * @Date: 2022-11-25 18:52:21
 * @LastEditors: Gavin 850680822@qq.com
 * @LastEditTime: 2022-11-28 12:55:05
 * @FilePath: \three-admin-react\src\components\Comp.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import { Button, Space } from 'antd';
import styles from './Comp.module.scss'
 const Comp1:React.FC=()=>{
    return (<div  className={styles.box} >
    <Button type="primary">Primary Button</Button>
    </div>)
}
export default Comp1