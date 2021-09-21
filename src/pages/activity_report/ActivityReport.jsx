import React from 'react';
import { Card, Table, Button } from 'antd';
import { FilterFilled } from '@ant-design/icons';

import ReportModal from './ReportModal';
import FilterModalContainer from './FilterModalContainer';

export default function ActivityReport(props) {
    const {
        reportVisible, setReportVisible, record, dispatch,
        activities, showReportModal, filterVisible,
        setFilterVisible, showFilterModal, setRespState,
        setImageState
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
                setRespState={setRespState}
                setImageState={setImageState}
            />

            <div style={{overflowX: 'auto'}}>
                <Table 
                    dataSource={activities}
                    columns={[
                        {
                            title: 'Activity',
                            dataIndex: 'action',
                            key: 'action'
                        },
                        {
                            title: 'Date',
                            dataIndex: 'date',
                            key: 'date',
                            render: text => text.join(', ')
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
                            render: (text, {report}) => {
                                return (
                                    <Button 
                                        type='link' 
                                        onClick={() => showReportModal(report)}
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