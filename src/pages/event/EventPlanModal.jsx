import React from 'react';
import { Modal, Table, Button, Card } from 'antd';
import { CheckOutlined, FilePdfOutlined } from '@ant-design/icons';

import './eventPlanModal.css';

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
                <div className="act-plan-modal-table-wrapper">
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
                                title: 'Regions',
                                dataIndex: 'regions',
                                key: 'regions',
                                render: regions => regions.join(', ')
                            },
                            {
                                title: 'Groups',
                                dataIndex: 'groups',
                                key: 'groups',
                                render: groups => groups.join(', ')
                            },
                            {
                                title: 'Materials',
                                dataIndex: 'materials',
                                key: 'materials'
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