import React, { useState, useRef } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Card, Table, Button, Space } from 'antd';
import { ArrowLeftOutlined, PlusOutlined, FilePdfOutlined } from '@ant-design/icons';

import AddActivity from './AddActivityModal';
import { customSearch, parseUrl } from 'utils';
import { Path } from 'routes';

export default function PlanActivities(props) {
    const {
        activities, visible, setVisible, 
        showModal, onExport, fetchProposals
    } = props;
    const history = useHistory();
    const params = useParams();

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
                    <Button type='primary' onClick={showModal}>
                        <PlusOutlined />Activity
                    </Button>
                    <Button type='primary' onClick={onExport}>
                        <FilePdfOutlined />Export
                    </Button>
                </Space>
            }
        >
            <AddActivity 
                visible={visible}
                setVisible={setVisible}
                fetchProposals={fetchProposals}
            />

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
                        render: (text, {key}) => {
                            const obj = {activityId: key, ...params};
                            const path = parseUrl(Path.activityPlans, obj);
                            return <Link to={path}>Plans</Link>;
                        }
                    }
                ]} 
            />
        </Card>
    );    
}