import React from 'react';
import { Card, Table, Button } from 'antd';

import ReportModal from './ReportModal';

export default function ActivityReport(props) {
    const {
        visible, setVisible, record, 
        activities, showModal
    } = props;
    
    return (
        <Card
            title='Activity Reports'
            style={{overflowX: 'auto'}}
            bordered={false}
        >
            <ReportModal 
                visible={visible}
                setVisible={setVisible}
                record={record}
            />

            <Table 
                dataSource={activities}
                columns={[
                    {
                        title: 'Activity',
                        dataIndex: 'activity',
                        key: 'activity'
                    },
                    {
                        title: 'Date',
                        dataIndex: 'date',
                        key: 'date'
                    },
                    {
                        title: 'Programme',
                        dataIndex: 'programme',
                        key: 'programme'
                    },
                    {
                        title: 'Region',
                        dataIndex: 'region',
                        key: 'region'
                    },
                    {
                        title: 'Group',
                        dataIndex: 'group',
                        key: 'group'
                    },
                    {
                        title: 'Report',
                        key: 'report',
                        render: (text, {narratives}) => {
                            return (
                                <Button type='link' onClick={() => showModal(narratives)}>
                                    report
                                </Button>
                            );
                        }
                    }
                ]}
            />
        </Card>
    );
}