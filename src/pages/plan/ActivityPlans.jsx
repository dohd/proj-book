import React from 'react';
import { Card, Table, Button } from 'antd';
import { PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router';

import { parseUrl } from 'utils';
import { Path } from 'routes';
import { Link } from 'react-router-dom';

export default function ActivityPlans(props) {
    const { setVisible, activityPlans } = props;
    const history = useHistory();
    const params = useParams();
    return (
        <Card
            bordered={false}
            title={
                <span>
                    <ArrowLeftOutlined 
                        style={{ fontSize: '18px' }}
                        onClick={() => history.goBack()} 
                    />&nbsp;
                    Implementation Plan
                </span>
            }
            extra={
                <Button 
                    type='primary' 
                    onClick={() => setVisible(true)}
                    icon={<PlusOutlined />}
                >
                    <span className='btn-text-none'>Add</span>
                </Button>
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
                        render: (txt, {key}) => {
                            const obj = { activityPlanId: key, ...params };
                            const path = parseUrl(Path.participants, obj);
                            return <Link to={path}>Participants</Link>;
                        }
                    }
                ]}
            />
        </Card>
    );
}