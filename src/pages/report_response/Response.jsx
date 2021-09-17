import React, {  } from 'react';
import { Button, Card, Space, Table } from 'antd';
import { ArrowLeftOutlined, FilePdfOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';

const data = [
    {
        key: '1',
        query: 'Deviation from original plan',
        task1: 'Do nostrud consequat eu nostrud  irure aliqua.',
        task2: 'nostrud sit fugiat cupidatat ea est nisi',
        task3: 'nostrud sit fugiat cupidatat ea est nisi'
    },
    {
        key: '2',
        query: 'Results attained',
        task1: 'nostrud sit fugiat cupidatat ea est nisi',
        task2: 'nostrud sit fugiat cupidatat ea est nisi',
        task3: 'nostrud sit fugiat cupidatat ea est nisi',
    },
    {
        key: '3',
        query: 'Number of attained results',
        task1: 'Lorem ad Lorem.',
        task2: 'Lorem ad Lorem.',
        task3: 'Lorem ad Lorem.'
    },
];

export default function Response(params) {
    const history = useHistory();
    return (
        <Card
            bordered={false}
            style={{overflowX: 'auto'}}
            title={
                <Space>
                    <ArrowLeftOutlined 
                        onClick={() => history.goBack()}
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
                    Scientific study of a particular subject over a period of time
                </p>
            </div>
            
            <div style={{overflowX: 'auto'}}>
                <Table
                    dataSource={data}
                    columns={[
                        {
                            title: 'Question',
                            key: 'query',
                            dataIndex: 'query'
                        },
                        {
                            title: 'Response',
                            align: 'center',
                            children: [
                                {
                                    title: 'Task1',
                                    key: 'task1',
                                    dataIndex: 'task1'
                                },
                                {
                                    title: 'Task2',
                                    key: 'task2',
                                    dataIndex: 'task2'
                                },
                                {
                                    title: 'Task3',
                                    key: 'task3',
                                    dataIndex: 'task3'
                                },
                            ]
                        },
                    ]}
                />
            </div>
        </Card>
    );
}