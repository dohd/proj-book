import React, { useState, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Card, Table, Button, Space } from 'antd';
import { ArrowLeftOutlined, FilePdfOutlined } from '@ant-design/icons'

import { customSearch } from 'utils';

export default function ApprovedObjectives(props) {
    const { objectives, onExport, approvedAct } = props;
    const history = useHistory();

    // custom search filter 
    const [search, setSearch] = useState({text: '', column: ''});
    const searchInput = useRef();
    const getColumnSearchProps = customSearch(search, setSearch, searchInput, 400);

    return (
        <Card 
            bordered={false}
            title={
                <Space>
                    <ArrowLeftOutlined 
                        onClick={() => history.goBack()}
                        style={{fontSize: '18px'}} 
                    />                       
                    Approved Proposal's Objectives
                </Space>       
            }
            extra={
                <Button type='primary' onClick={onExport}>
                    <FilePdfOutlined />Export
                </Button>
            }
        >
            <Table 
                dataSource={objectives} 
                columns={[
                    {
                        title: 'Objective',
                        dataIndex: 'objective',
                        key: 'objective',
                        ...getColumnSearchProps('objective')
                    },
                    {
                        title: 'Action',
                        dataIndex: 'action',
                        key: 'action',
                        render: (text, {key}) => {
                            return (
                                <Link to={approvedAct(key)}>
                                    activities
                                </Link>
                            );
                        }
                    }
                ]}  
            />
        </Card>
    );    
}