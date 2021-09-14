import React from 'react';
import { Card, Table, Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import ResponseModal from './ResponseModal';
import ImageModal from './ImageModal';
import { parseUrl } from 'utils';
import { Path } from 'routes';

export default function ActivityReport(props) {
    const {
        visible, setVisible, record, 
        activities, showResponseModal,
        showImageModal
    } = props;
    
    return (
        <Card
            title='Activity Reports'
            style={{overflowX: 'auto'}}
            bordered={false}
        >
            <ResponseModal 
                visible={visible.response}
                setVisible={setVisible}
                record={record}
            />

            <ImageModal 
                visible={visible.image}
                setVisible={setVisible}
                record={record}
            />

            <Table 
                dataSource={activities}
                columns={[
                    {
                        title: 'Activity',
                        dataIndex: 'activity',
                        key: 'activity'
                    },
                    {
                        title: 'Date',
                        dataIndex: 'date',
                        key: 'date'
                    },
                    {
                        title: 'Programme',
                        dataIndex: 'programme',
                        key: 'programme'
                    },
                    {
                        title: 'Region',
                        dataIndex: 'region',
                        key: 'region'
                    },
                    {
                        title: 'Group',
                        dataIndex: 'group',
                        key: 'group'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        render: (txt, {key, narratives}) => {
                            const params = { activityId: key };
                            const casePath = parseUrl(Path.caseStudies, params);
                            return (
                                <Dropdown
                                    overlay={
                                        <Menu>
                                            <Menu.Item 
                                                key='responses'
                                                onClick={() => showResponseModal(narratives)}
                                            >
                                                Responses
                                            </Menu.Item>
                                            <Menu.Item key='case studies'>
                                                <Link 
                                                    to={casePath} 
                                                    style={{color: 'rgba(0, 0, 0, 0.85)'}}
                                                >
                                                    Case studies
                                                </Link>
                                            </Menu.Item>
                                            <Menu.Item 
                                                key='images'
                                                onClick={() => showImageModal(narratives)}
                                            >
                                                Images
                                            </Menu.Item>
                                        </Menu>
                                    }
                                >
                                    <Button type='link' size='large'>
                                        narrative report <DownOutlined />
                                    </Button>
                                </Dropdown>
                            );
                        }
                    }
                ]}
            />
        </Card>
    );
}