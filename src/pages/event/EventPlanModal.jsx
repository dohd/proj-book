import React from 'react';
import { Modal, Table, Button, Card } from 'antd';
import { CheckOutlined, FilePdfOutlined } from '@ant-design/icons';

export default function EventPlanModal(props) {
    const {
        plans, onOk, onCancel, visible, 
        eventDate, onExport
    } = props;
    
    return (
        <Modal
            visible={visible}
            okText='Done'
            onOk={onOk}
            onCancel={onCancel}
            cancelButtonProps={{ disabled: true }}
            width={800}
            closable={false}
        >
            <Card
                bordered={false}
                title={`Activity Plan: ${eventDate}`}
                extra={
                    <Button
                        type='default'
                        onClick={onExport}
                        icon={<FilePdfOutlined />}
                    >
                        <span className='btn-text-none'>Export</span>
                    </Button>
                }
            >   
                <div style={{overflowX: 'auto'}}>
                    <Table 
                        dataSource={plans}
                        columns={[
                            {
                                title: 'Activity',
                                dataIndex: 'activity',
                                key: 'activity',
                            },
                            {
                                title: 'Programme',
                                dataIndex: 'programme',
                                key: 'programme',
                            },
                            {
                                title: 'Region',
                                dataIndex: 'region',
                                key: 'region'
                            },
                            {
                                title: 'Group',
                                dataIndex: 'group',
                                key: 'group',
                            },
                            {
                                title: 'Material',
                                dataIndex: 'material',
                                key: 'material'
                            },
                            {
                                title: 'Status',
                                dataIndex: 'status',
                                key: 'status',
                                render: text => text ? <CheckOutlined /> : '_'
                            }
                        ]}
                    />
                </div>
            </Card>
        </Modal>
    );
}
