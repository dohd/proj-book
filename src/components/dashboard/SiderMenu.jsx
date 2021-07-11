import React from 'react';
import { Menu } from 'antd';
import { 
    DashboardOutlined, ScheduleOutlined, SettingOutlined,
    AuditOutlined, TeamOutlined, InfoOutlined,
    ProjectOutlined, GlobalOutlined, ExceptionOutlined,
    ProfileOutlined, FileTextOutlined, AreaChartOutlined,
    ContactsOutlined, LogoutOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { Path } from 'routes';
import { isAdmin } from 'api';

const { SubMenu } = Menu;

export default function SiderMenu({toggleLogout}) {
    return (
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
            <Menu.Item 
                className='logout-menu'
                key='logout'
                icon={<LogoutOutlined />}
                onClick={toggleLogout}
            >
                Logout
            </Menu.Item>   
        </Menu>
    );
}