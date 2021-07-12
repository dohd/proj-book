import React, { useState, useRef } from 'react';
import { Card, Table, Button } from 'antd';
import { FilePdfOutlined } from '@ant-design/icons';

import './participantAnalysis.css';
import { customSearch } from 'utils';

export default function ParticipantAnalysis(props) {
    const { analysis, onExport } = props;

    // custom search filter 
    const [search, setSearch] = useState({text: '', column: ''});
    const searchInput = useRef();
    const getColumnSearchProps = customSearch(search, setSearch, searchInput);

    return (
        <Card
            bordered={false}
            className='part-analysis-card'
            style={{ overflowX: 'auto' }}
            title='Participant Analysis'
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
            <div className='part-analysis-table-wrapper'>            
                <Table
                    bordered 
                    dataSource={analysis}
                    columns={[
                        {
                            title: 'Activity',
                            children: [
                                {
                                    title: 'Title',
                                    dataIndex:'title',
                                    key: 'title',
                                    ...getColumnSearchProps('title')
                                },
                                {
                                    title: 'Date',
                                    dataIndex: 'date',
                                    key: 'date',
                                },
                            ],
                            
                        },
                        {
                            title: 'Plan',
                            children: [
                                {
                                    title: 'Programme',
                                    dataIndex:'programme',
                                    key: 'programme',
                                    ...getColumnSearchProps('programme')
                                },
                                {
                                    title: 'Regions',
                                    dataIndex:'regions',
                                    key: 'regions',
                                },
                                {
                                    title: 'Groups',
                                    dataIndex:'groups',
                                    key: 'groups',
                                },
                            ]
                        },
                        {
                            title: 'Gender',
                            children: [
                                {
                                    title: 'Male',
                                    dataIndex:'male',
                                    key: 'male'
                                },
                                {
                                    title: 'Female',
                                    dataIndex:'female',
                                    key: 'female'
                                },
                                {
                                    title: 'Total',
                                    dataIndex:'total',
                                    key: 'total'
                                }
                            ]
                        }
                    ]}
                />
            </div>
        </Card>
    );
}