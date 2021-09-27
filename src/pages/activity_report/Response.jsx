import React, {  } from 'react';
import { Button, Card, Popconfirm, Space, Table } from 'antd';
import { 
    ArrowLeftOutlined, FilePdfOutlined, EditTwoTone, 
    DeleteOutlined 
} from '@ant-design/icons';

export default function Response(props) {
    const {toggleReportView, taskCol, rowData, case_study} = props;
    return (
        <Card
            bordered={false}
            style={{overflowX: 'auto'}}
            title={
                <Space>
                    <ArrowLeftOutlined 
                        onClick={toggleReportView}
                        style={{fontSize: '18px'}} 
                    />                       
                    Report Response
                </Space>  
            }
            extra={
                <Button
                    type='default' 
                    onClick={()=>void(0)}
                    icon={<FilePdfOutlined />}
                >
                    <span className='btn-text-none'>Export</span>
                </Button>
            }
        >
            <div>
                <p>Case study</p>
                <p>&bull;&nbsp;
                    {case_study}
                </p>
            </div>
            
            <div style={{overflowX: 'auto'}}>
                <Table
                    dataSource={rowData}
                    columns={[
                        {
                            title: 'Question',
                            key: 'query',
                            dataIndex: 'query'
                        },
                        {
                            title: 'Task Response',
                            children: taskCol
                        },
                        {
                            title: 'Action',
                            dataIndex: 'action',
                            key: 'action',
                            render: (text, record) => {
                                return (
                                    <Space>
                                        <Button 
                                            type='link' 
                                            // onClick={() => showUpdateModal(record)}
                                            icon={
                                                <EditTwoTone style={{ fontSize: '20px' }} />
                                            }
                                        />
                                        
                                        <Popconfirm
                                            title='Are you sure to delete this donor?'
                                            // onConfirm={() => onDelete(record.key)}
                                            okText='Yes'
                                            cancelText='No'
                                        >
                                            <Button
                                                type='link'
                                                icon={
                                                    <DeleteOutlined 
                                                        style={{ color: 'red', fontSize: '18px' }} 
                                                    />
                                                }
                                            />
                                        </Popconfirm>
                                    </Space>
                                );
                            }
                        }
                    ]}
                />
            </div>
        </Card>
    );
}