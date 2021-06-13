import React, { useState, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Card, Table, Button, Space } from 'antd';
import { ArrowLeftOutlined, FilePdfOutlined } from '@ant-design/icons';

import { customSearch, parseUrl } from 'utils';
import { Path } from 'routes';

export default function PendingReport(props) {
    const { activities, onExport } = props;
    const history = useHistory();

    const obj = record => ({
        activityId: record.key,
        objectiveId: record.objective.id,
        proposalId: record.objective.proposal.id
    });

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
                        style={{ fontSize: '18px' }} 
                    /> 
                    Implementation Plan  
                </Space>       
            }
            extra={
                <Space>
                    <Button type='primary' onClick={onExport}>
                        <FilePdfOutlined />Export
                    </Button>
                </Space>
            }
        >
            <Table 
                dataSource={activities} 
                columns={[
                    {
                        title: 'Activity',
                        dataIndex: 'activity',
                        key: 'activity',
                        ...getColumnSearchProps('activity')
                    },
                    {
                        title: 'Action',
                        dataIndex: 'action',
                        key: 'action',
                        render: (text, record) => {
                            const path = parseUrl(Path.activityPlans, obj(record));
                            return <Link to={path}>Plans</Link>;
                        }
                    }
                ]} 
            />
        </Card>
    );    
}