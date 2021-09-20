import React, {  } from 'react';
import { Button, Card, Space, Table } from 'antd';
import { ArrowLeftOutlined, FilePdfOutlined } from '@ant-design/icons';

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
                    ]}
                />
            </div>
        </Card>
    );
}