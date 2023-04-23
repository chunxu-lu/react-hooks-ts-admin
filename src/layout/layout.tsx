import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import './layout.css'
import { menus } from './layout.config';
import { Route,Switch } from 'dva/router'
import BannerManage from '../pages/bannerManage/bannerManage';
import ActivityManage from '../pages/activityManage/activityManage';
import AdminUserAdmin from '../pages/adminUserAdmin/adminUserAdmin';
import RegisterUserCheck from '../pages/registerUserCheck/registerUserCheck';
import { MenuInfo } from 'rc-menu/lib/interface';
import {useHistory,useSelector} from 'dva';
import { IGlobalState } from '../model/type';
import useLayout from './layout.hooks';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
    const history = useHistory()
    const { currentMenus } = useLayout()
    console.log('currentMenus',currentMenus);
    
    const globalState = useSelector<{global:IGlobalState},IGlobalState>(({global}) => global)

    const routerRender = (menuArr = currentMenus) => {
        return menuArr.map((item) => 
            <Route component={item.component} path={item.key + ""}>
                {item.children && routerRender(item.children)}
            </Route>
        )
    }
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const linkPage = ({ key }:MenuInfo) => {
        history.push(key)
   }
   const logout = () => {
    localStorage.clear()
    history.push('/login')
   }
  return (
    <Layout id='layout'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
            活动管理平台
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={currentMenus}
          onClick={linkPage}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
            <div className='header-box'>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: () => setCollapsed(!collapsed),
                })}
                <Button type='link' className='header-btn' onClick={logout}>退出登录</Button>
            </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
            <Switch>
               {routerRender()}
            </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;