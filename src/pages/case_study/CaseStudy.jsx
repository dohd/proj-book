import React, { useState, useRef } from 'react';
import { Card, Table, Space, Button, Popconfirm } from 'antd';
import { 
    FilePdfOutlined, ArrowLeftOutlined,
    EditTwoTone, DeleteOutlined
} from '@ant-design/icons';
import { useHistory } from 'react-router';

import StudyModal from './StudyModal';
import { customSearch } from 'utils';

export default function CaseStudy(props) {
    const { 
        caseStudies, onExport, record,
        visible, setVisible, showModal,
        onDelete, fetchCaseStudies
    } = props;
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
                    Case Studies
                </Space>       
            }  
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
            <StudyModal
                visible={visible} 
                setVisible={setVisible}
                record={record}
                fetchCaseStudies={fetchCaseStudies}
            />

            <div style={{overflowX: 'auto'}}>
                <Table 
                    dataSource={caseStudies}
                    columns={[
                        {
                            title: 'Report',
                            dataIndex: 'report',
                            key: 'report',
                            ...getColumnSearchProps('activity')
                        },
                        {
                            title: 'Case Study',
                            dataIndex: 'caseStudy',
                            key: 'caseStudy',
                            render: text => <div style={{minWidth: '150px'}}>{text}</div>
                        },
                        {
                            title: 'Action',
                            key: 'action',
                            render: (txt, record) => {
                                return (
                                    <Space>
                                        <Button 
                                            type='link' 
                                            onClick={() => showModal(record)}
                                            icon={
                                                <EditTwoTone style={{ fontSize: '20px' }} />
                                            }
                                        />
                                        
                                        <Popconfirm
                                            title='Are you sure to delete this study?'
                                            onConfirm={() => onDelete(record.key)}
                                            okText='Yes'
                                            cancelText='No'
                                        >
                                            <Button
                                                type='link'
                                                icon={
                                                    <DeleteOutlined 
                                                        style={{ color: 'red', fontSize: '18px' }} 
                                                    />
                                                }
                                            />
                                        </Popconfirm>
                                    </Space>
                                );
                            }
                        }
                    ]}
                />
            </div>
        </Card>
    );
}