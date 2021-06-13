import React from 'react';
import { Button, Card, Popconfirm, Space, Table } from 'antd';
import { ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { parseUrl } from 'utils';
import { Path } from 'routes';

export default function PlanParticipant(props) {
    const { activityPlans, onDelete } = props;
    const history = useHistory();

    const obj = record => ({
        activityPlanId: record.key,
        activityId: record.activity.id,
        objectiveId: record.activity.objective.id,
        proposalId: record.activity.objective.proposal.id
    });

    return (
        <Card
            bordered={false}
            title={
                <Space>
                    <ArrowLeftOutlined 
                        style={{ fontSize: '18px' }}
                        onClick={() => history.goBack()} 
                    />
                    Activity Plans
                </Space>
            }
        >
            <Table
                dataSource={activityPlans}
                columns={[
                    {
                        title: 'Plan',
                        dataIndex: 'plan',
                        key: 'plan'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        render: (txt, record) => {                        
                            const path = parseUrl(Path.participants, obj(record));
                            return (
                                <>
                                    <Popconfirm
                                        title='Are you sure to delete this plan?'
                                        onConfirm={() => onDelete(record.key)}
                                        okText='Yes'
                                        cancelText='No'
                                    >
                                        <Button 
                                            type='link'
                                            icon={
                                                <DeleteOutlined style={{ color: 'red' }}/>
                                            }
                                        />
                                    </Popconfirm>
                                    <Link to={path}>Participants</Link>
                                </>
                            );
                        }
                    }
                ]}
            />
        </Card>
    );
}