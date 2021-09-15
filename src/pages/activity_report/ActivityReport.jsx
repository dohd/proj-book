import React from 'react';
import { Card, Table, Button } from 'antd';
import { FilterFilled } from '@ant-design/icons';

import ReportModal from './ReportModal';
import FilterModalContainer from './FilterModalContainer';

export default function ActivityReport(props) {
    const {
        reportVisible, setReportVisible, record, 
        activities, showReportModal, filterVisible,
        setFilterVisible, showFilterModal
    } = props;
    
    return (
        <Card
            title='Activity Reports'            
            bordered={false}
            extra={
                <Button 
                    type='default' 
                    onClick={showFilterModal}
                    icon={<FilterFilled />}
                >
                    <span className='btn-text-none'>Filter</span>
                </Button>
            }
        >   
            <FilterModalContainer 
                visible={filterVisible}
                setVisible={setFilterVisible}
            />

            <ReportModal 
                visible={reportVisible}
                setVisible={setReportVisible}
                record={record}
            />

            <div style={{overflowX: 'auto'}}>
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
                                    <Button 
                                        type='link' 
                                        onClick={() => showReportModal(narratives)}
                                        size='large'
                                    >
                                        report
                                    </Button>
                                );
                            }
                        }
                    ]}
                />
            </div>
        </Card>
    );
}