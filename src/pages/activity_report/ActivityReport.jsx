import React from 'react';
import { Card, Table, Button } from 'antd';
import { FilterFilled } from '@ant-design/icons';

import ReportModal from './ReportModal';
import FilterModalContainer from './FilterModalContainer';

export default function ActivityReport(props) {
    const {
        reportVisible, setReportVisible, record, 
        activities, showReportModal, filterVisible,
        setFilterVisible, showFilterModal, setResponseState,
        setImageState, onDelete
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
                setResponseState={setResponseState}
                setImageState={setImageState}
                onDelete={onDelete}
            />

            <div style={{overflowX: 'auto'}}>
                <Table 
                    dataSource={activities}
                    columns={[
                        {
                            title: 'Activity',
                            dataIndex: 'action',
                            key: 'action',
                            render: text => <div style={{minWidth: '100px'}}>{text}</div>
                        },
                        {
                            title: 'Date',
                            dataIndex: 'date',
                            key: 'date',
                            render: text => <div style={{minWidth: '100px'}}>{text.join(', ')}</div>
                        },
                        {
                            title: 'Programme',
                            dataIndex: 'programme',
                            key: 'programme',
                            render: text => text.join(', ')
                        },
                        {
                            title: 'Region',
                            dataIndex: 'region',
                            key: 'region',
                            render: text => text.join(', ')
                        },
                        {
                            title: 'Group',
                            dataIndex: 'group',
                            key: 'group',
                            render: text => text.join(', ')
                        },
                        {
                            title: 'Report',
                            key: 'report',
                            render: (text, record) => {
                                return (
                                    <Button type='link' onClick={() => showReportModal(record)} size='large'>
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