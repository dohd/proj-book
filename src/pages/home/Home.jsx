import React from 'react';
import { Card, Table, Row, Col, Space, Tooltip } from 'antd';
import { 
    ProjectOutlined, TeamOutlined, ScheduleOutlined,
    EllipsisOutlined, FileDoneOutlined, CarryOutOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import './home.css';
import { Path } from 'routes';

export default function Home(props) {
    const { donors, proposals, activity, schedule } = props;
    return (
        <Card
            bordered={false}
            className='home-card'
        >   
            <Row gutter={8}>
                <Col xs={24} sm={12} className='gutter-row'>
                    <div className='donors'>
                        <TeamOutlined className='category-icon' />
                        <p className='category-value'>{donors}</p>
                        <p className='category-label'>Donors</p>
                    </div>
                </Col>
                <Col xs={24} sm={12} className='gutter-row'>
                    <div className='narrative'>
                        <CarryOutOutlined className='category-icon' />
                        <p className='category-value'>{activity}</p>
                        <p className='category-label'>Activities Implemented</p>
                    </div>
                </Col>
            </Row>

            <Row gutter={8}>
                <Col xs={24} sm={12} className='gutter-row'>
                    <div className='pending'>
                        <ProjectOutlined className='category-icon' />
                        <p className='category-value'>{proposals.pending}</p>
                        <p className='category-label'>Pending Proposals</p>
                    </div>
                    
                </Col>
                <Col xs={24} sm={12} className='gutter-row'>
                    <div className='approved'>
                        <FileDoneOutlined className='category-icon' />
                        <p className='category-value'>{proposals.approved}</p>
                        <p className='category-label'>Approved Proposals</p>
                    </div>
                </Col>
            </Row>

            <Card 
                className='schedule-card'
                bordered={false}
                title={
                    <Space>
                        <ScheduleOutlined />
                        Activity schedule
                    </Space>
                }
                extra={
                    <Link to={Path.eventCalendar}>
                        <Tooltip title='Event Calendar'>
                            <EllipsisOutlined style={{ fontSize: '2em' }} />
                        </Tooltip>
                    </Link>
                }
            >   
                <div className="schedule-table-wrapper">
                    <Table 
                        dataSource={schedule}
                        columns={[
                            {
                                title: 'Activity',
                                dataIndex: 'action',
                                key: 'action'
                            },
                            {
                                title: 'Remaining Days',
                                dataIndex: 'rem_day',
                                key: 'rem_day',
                                className: 'days-col'
                            },
                            {
                                title: 'Implementation Date',
                                dataIndex: 'date',
                                key: 'date'
                            }
                        ]}
                    />
                </div>                
            </Card>
        </Card>
    );
}