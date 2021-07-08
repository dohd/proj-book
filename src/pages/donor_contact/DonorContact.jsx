import React, { useState, useRef } from 'react';
import { Card, Table, Button, Space, Popconfirm } from 'antd';
import { 
    PlusOutlined, EditTwoTone, DeleteOutlined,
    FilePdfOutlined
} from '@ant-design/icons';

import './donorContact.css';
import AddContact from './AddContactModal';
import EditContact from './EditContactModal';
import { customSearch } from 'utils';

export default function Donor(props) {
    const {
        visible, setVisible,showModal, 
        showUpdateModal, onDelete,
        onExport, state, fetchDonorContacts
    } = props;

    // custom search filter 
    const [search, setSearch] = useState({text: '', column: ''});
    const searchInput = useRef();
    const getColumnSearchProps = customSearch(search, setSearch, searchInput);

    return (
        <Card
            title='Donor Contact Person'
            className='donor-contact-card'
            bordered={false}
            extra={
                <Space>
                    <Button type='primary' onClick={showModal}>
                        <PlusOutlined />Contact
                    </Button>
                    <Button type='primary' onClick={onExport}>
                        <FilePdfOutlined />Export
                    </Button>
                </Space>
            }
        >
            <AddContact 
                visible={visible.create} 
                setVisible={setVisible} 
                fetchDonorContacts={fetchDonorContacts}
                donors={state.donors}
            />
            
            <EditContact
                record={state.record}
                visible={visible.update} 
                setVisible={setVisible} 
                fetchDonorContacts={fetchDonorContacts}
                donors={state.donors}
            />

            <div className='donor-contact-table-wrapper'>
                <Table
                    dataSource={state.contacts} 
                    columns={[
                        {
                            title: 'Donor',
                            dataIndex: 'donor',
                            key: 'donor'
                        },
                        {
                            title: 'Contact Name',
                            dataIndex: 'contactName',
                            key: 'contactName',
                            ...getColumnSearchProps('contactName')
                        },
                        {
                            title: 'Telephone',
                            dataIndex: 'telephone',
                            key: 'telephone'
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
                                            title='Are you sure to delete this contact?'
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