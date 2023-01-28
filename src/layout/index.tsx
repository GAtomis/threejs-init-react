/*
 * @Author: Gavin 850680822@qq.com
 * @Date: 2022-11-26 10:27:39
 * @LastEditors: Gavin 850680822@qq.com
 * @LastEditTime: 2022-12-01 15:11:30
 * @FilePath: \three-admin-react\src\views\Home.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Breadcrumb  } from 'antd';
import {Outlet } from 'react-router-dom';
import Aside from './components/Aside'

const { Header, Sider, Content } = Layout;


const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (

    <div className="layout-container">    <Layout className="layout-container">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
      <Aside/>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0, display: "flex", alignItems: "center" }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}


          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="">Application Center</a>
            </Breadcrumb.Item>
          </Breadcrumb>


        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 10,
            minHeight: 280,
          }}
          id="Content"
        >
          <Outlet/>

        </Content>
      </Layout>
    </Layout></div>

  );
};

export default App;