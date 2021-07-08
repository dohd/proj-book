import React, { useState, useRef } from 'react';
import { Card, Table, Button, Space, Popconfirm } from 'antd';
import { 
    PlusOutlined, EditTwoTone, DeleteOutlined,
    FilePdfOutlined
} from '@ant-design/icons';

import './donor.css';
import AddDonor from './AddDonorModal';
import EditDonor from './EditDonorModal';
import { customSearch } from 'utils';

export default function Donor(props) {
    const {
        state, visible, setVisible, showModal, 
        showUpdateModal, onDelete, fetchDonors,
        onExport,
    } = props;

    // custom search filter 
    const [search, setSearch] = useState({text: '', column: ''});
    const searchInput = useRef();
    const getColumnSearchProps = customSearch(search, setSearch, searchInput);

    return (
        <Card
            title='Donors'
            className='donor-card'
            bordered={false}
            extra={
                <Space>
                    <Button type='primary' onClick={showModal}>
                        <PlusOutlined />Add
                    </Button>
                    <Button type='primary' onClick={onExport}>
                        <FilePdfOutlined />Export
                    </Button>
                </Space>
            }
        >
            <AddDonor 
                fetchDonors={fetchDonors}
                visible={visible.create} 
                setVisible={setVisible} 
            />
            
            <EditDonor 
                record={state.record}
                fetchDonors={fetchDonors}
                visible={visible.update} 
                setVisible={setVisible} 
            />

            <div className='donor-table-wrapper'>
                <Table
                    dataSource={state.donors} 
                    columns={[
                        {
                            title: 'Name',
                            dataIndex: 'name',
                            key: 'name',
                            ...getColumnSearchProps('name')
                        },
                        {
                            title: 'Phone',
                            dataIndex: 'phone',
                            key: 'phone'
                        },
                        {
                            title: 'Email',
                            dataIndex: 'email',
                            key: 'email'
                        },
                        {
                            title: 'Action',
                            dataIndex: 'action',
                            key: 'action',
                            render: (text, record) => {
                                return (
                                    <Space>
                                        <Button 
                                            type='link' 
                                            onClick={() => showUpdateModal(record)}
                                            icon={
                                                <EditTwoTone style={{ fontSize: '20px' }} />
                                            }
                                        />
                                        
                                        <Popconfirm
                                            title='Are you sure to delete this donor?'
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