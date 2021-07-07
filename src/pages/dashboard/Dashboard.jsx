import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Layout, Breadcrumb, Drawer } from 'antd';
import { MenuOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import './dashboard.css';
import SiderMenu from './SiderMenu';
import homeRoutes from './routeConfig';
import { AvatarProfile } from 'components';
import { Path, RouteNameMap } from 'routes';

const { Header, Sider, Content, Footer } = Layout;

export default function Dashboard(props) {
    const { 
        routePaths, profileName, profileImage,
        visible, onClose, showDrawer, toggleLogout
    } = props;
    const history = useHistory();

    const breadcrumbItems = routePaths.map((url,indx,arr) => {
        const last = arr.indexOf(url) === arr.length - 1;
        return (
            <Breadcrumb.Item key={url}>
                { 
                    last ? <span>{ RouteNameMap[url] }</span> :
                    <Link to={url}>{ RouteNameMap[url] }</Link> 
                }
            </Breadcrumb.Item>
        );
    });

    const mainSection = homeRoutes.map(([path, component]) => (
        <Route exact path={path} component={component} key={path} />
    ));
    
    return (
        <Layout>
            <Drawer
                className='dash-drawer'
                title={
                    <h2 className='app-name'>
                        PROJ-BOOK
                    </h2>
                }
                placement="left"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <SiderMenu toggleLogout={toggleLogout} />
            </Drawer>

            <Sider className='sider'>
                <h2 
                    className='app-name' 
                    onClick={() => history.push(Path.home)}
                >
                    PROJ-BOOK
                </h2>

                <div className='avatar-container'>
                    <AvatarProfile profileImage={profileImage} />
                    <p className='profile-name'>{ profileName }</p>
                </div>

                <SiderMenu toggleLogout={toggleLogout} />
            </Sider>

            <Layout className='main-layout'>
                <Header className='header'>
                    <div className='header-icons'>
                        <MenuOutlined className='menu-icon' onClick={showDrawer}/>

                        <Link to={Path.settings}>
                            <SettingOutlined className='setting-icon'/>
                        </Link>
                        
                        <LogoutOutlined className='logout-icon' onClick={toggleLogout}/>
                    </div>
                </Header>

                <Content className='content'>
                    <Breadcrumb className='breadcrumb'>
                        { breadcrumbItems }
                    </Breadcrumb>

                    <div className='main-section'>
                        { mainSection }
                    </div>
                </Content>

                <Footer className='footer'>
                    <p style={{ fontWeight: 'normal' }}>
                        Copyright ©2021 Proj-book. All rights reserved.
                    </p>
                </Footer>
            </Layout>
        </Layout>
    );
}