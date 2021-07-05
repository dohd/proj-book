import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { 
    DashboardOutlined, ScheduleOutlined, SettingOutlined,
    AuditOutlined, TeamOutlined, InfoOutlined,
    ProjectOutlined, GlobalOutlined, ExceptionOutlined,
    ProfileOutlined, FileTextOutlined, AreaChartOutlined,
    ContactsOutlined
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import './dashboard.css';
import homeRoutes from './routeConfig';
import { AvatarProfile, Logout } from 'components';
import { Path, RouteNameMap } from 'routes';
import { isAdmin } from 'api';

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

export default function Dashboard(props) {
    const { routePaths, profileName, profileImage } = props;   
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

                <Menu
                    defaultSelectedKeys={['dashboard']}
                    mode='inline'
                    theme='dark'
                >
                    <Menu.Item key='dashboard'>
                        <Link to={Path.home}>
                            <DashboardOutlined />&nbsp;
                            Dashboard
                        </Link>
                    </Menu.Item> 

                    {
                        isAdmin() &&
                        <SubMenu
                            key='organisation'
                            title='Organisation'
                            icon={<GlobalOutlined />}
                        >
                            <Menu.Item key='key-programme'>
                                <Link to={Path.programmes}>Key Programme</Link>
                            </Menu.Item>

                            <Menu.Item key='target-region'>
                                <Link to={Path.regions}>Target Region</Link>
                            </Menu.Item>
                            
                            <Menu.Item key='target-group'>
                                <Link to={Path.groups}>Target Group</Link>
                            </Menu.Item>
                        </SubMenu>
                    }                    

                    <SubMenu
                        key='donor-info'
                        title='Donor Info'
                        icon={<InfoOutlined />}
                    >   
                        <Menu.Item key='donor'>
                            <Link to={Path.donors}>
                                <TeamOutlined /> Donor
                            </Link>
                        </Menu.Item>

                        <Menu.Item key='contact'>
                            <Link to={Path.donorContacts}>
                                <ContactsOutlined /> Contact
                            </Link>
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key='proposal'>
                        <Link to={Path.proposals}>
                            <ProjectOutlined />&nbsp;&nbsp;
                            Proposal
                        </Link>
                    </Menu.Item>

                    <Menu.Item key='event-calendar'>
                        <Link to={Path.eventCalendar}>
                            <ScheduleOutlined />&nbsp;&nbsp; 
                            Event Calendar
                        </Link>
                    </Menu.Item>

                    <Menu.Item key='participant-analysis'>
                        <Link to={Path.participantAnalysis}>
                            <AuditOutlined />&nbsp;&nbsp; 
                            Participant Analysis
                        </Link>
                    </Menu.Item>

                    <Menu.Item key='narrative-report'>
                        <Link to={Path.activityReport}>
                            <FileTextOutlined />&nbsp;&nbsp; 
                            Activity Report
                        </Link>
                    </Menu.Item>

                    <SubMenu
                        key='actions'
                        title='Pending Action'
                        icon={<ExceptionOutlined />}
                    >
                        <Menu.Item key='activity-plan'>
                            <Link to={Path.pendingActivities}>Activity Plan</Link>
                        </Menu.Item>
                        <Menu.Item key='plan-participant'>
                            <Link to={Path.pendingPlans}>Plan Participant</Link>
                        </Menu.Item>
                        <Menu.Item key='activity-report'>
                            <Link to={Path.pendingActivityReport}>Activity Report</Link>
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key='graphs'>
                        <Link to={Path.graphs}>
                            <AreaChartOutlined />&nbsp;&nbsp;
                            Data Visualization
                        </Link>
                    </Menu.Item>

                    <SubMenu
                        key='account'
                        title='Account'
                        icon={<ProfileOutlined />}
                    >
                        {
                            isAdmin() &&
                            <Menu.Item key='users'>
                                <Link to={Path.users}>
                                <TeamOutlined /> Users
                                </Link>
                            </Menu.Item>
                        }
                        
                        <Menu.Item key='settings'>
                            <Link to={Path.settings}>
                                <SettingOutlined /> Settings
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>

            <Layout style={{ marginLeft: 200 }}>
                <Header className='header'>
                    <div className='header-icons'>
                        <Link to={Path.settings}>
                            <SettingOutlined className='setting-icon'/>
                        </Link>
                        <Logout />
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