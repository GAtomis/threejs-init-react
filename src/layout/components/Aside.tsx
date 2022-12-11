/*
 * @Author: Gavin 850680822@qq.com
 * @Date: 2022-12-01 14:55:43
 * @LastEditors: Gavin 850680822@qq.com
 * @LastEditTime: 2022-12-11 23:41:15
 * @FilePath: \three-admin-react\src\layout\components\Aside.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Menu, MenuProps } from 'antd';
import { useRouterFilter } from '@/hooks/useRouter'
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

type MenuItem={
    key: React.Key;
    icon: React.ReactNode;
    children: any[] | undefined;
    label: React.ReactNode;
    type?: "group" | undefined;
}
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: any[],
    type?: 'group',
):MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    }
}

const Aside: React.FC = () => {

    const navigateTo = useNavigate()
    const route = useLocation()
    const [menus, setMenus] = useState<MenuItem[]>([
    ])
    const [openKeys, setOpenKeys] = useState<string[]>([""])
    useEffect(() => {

        setMenus([
            getItem("Dashboard", "/home", <VideoCameraOutlined />),
            getItem('three', 'about', <UserOutlined />, [
                getItem('Started', '/about'),
                getItem('Gasp', '/gasp'),
            ]),


            {
                key: '/key2',
                icon: <UploadOutlined />,
                label: 'any2',
                children:[]
            }])     

    }, [])
    useEffect(()=>{

        setOpenKeys(  useRouterFilter<MenuItem,React.Key>(menus,(item,parents)=>{
            console.warn(parents);
            return  (item.key==route.pathname&&parents)?parents?.key:''
        }) as string[]
)
 
    },[menus])


    const menuClick = (e: any) => {

        console.log(e);
        navigateTo(e.key)


    }
    const onOpenChange: MenuProps['onOpenChange'] = keys => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        console.log(keys);

        // if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
        //   setOpenKeys(keys);
        // } else {
        //   setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        // }
        setOpenKeys([keys?.pop() ?? ""])

    }

    return (<Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[route.pathname]}
        items={menus}
        onClick={menuClick}
        onOpenChange={onOpenChange}
        openKeys={openKeys}
    />)


}





export default Aside