import React from 'react';
import { Card, Table, Button, Popconfirm } from 'antd';
import { UserAddOutlined, EditTwoTone, DeleteOutlined } from '@ant-design/icons';

import './users.css';
import AddUserModal from './AddUserModal';
import UpdateUser from './EditUserModal';

export default function Users(props) {
    const { 
        visible, setVisible, showModal, 
        fetchUsers, state, showUpdateModal,
        onDelete
    } = props;

    return (
        <Card
            title='Users'
            bordered={false}
            className='users-card'
            extra={
                <Button 
                    type='primary' 
                    onClick={showModal}
                    icon={<UserAddOutlined />}
                >
                    <span className='btn-text-none'>Add</span>
                </Button>               
            }
        >
            <AddUserModal 
                visible={visible.create} 
                setVisible={setVisible} 
                fetchUsers={fetchUsers}
                userRoles={state.roles}
            />

            <UpdateUser 
                visible={visible.update} 
                setVisible={setVisible} 
                record={state.record}
                fetchUsers={fetchUsers}
                userRoles={state.roles}
            />

            <div className='users-table-wrapper'>
                <Table
                    dataSource={state.users}
                    columns={[
                        {
                            title: 'Username',
                            dataIndex: 'username',
                            key: 'username'
                        },
                        {
                            title: 'Email',
                            dataIndex: 'email',
                            key: 'email'
                        },
                        {
                            title: 'Initial',
                            dataIndex: 'initial',
                            key: 'initial'
                        },
                        {
                            title: 'Role',
                            dataIndex: 'role',
                            key: 'role',
                            render: ({value}) => value
                        },
                        {
                            title: 'Action',
                            dataIndex: 'action',
                            key: 'action',
                            render: (text, record) => {
                                return (
                                    <div>
                                        <Button 
                                            type='link' 
                                            onClick={() => showUpdateModal(record)}
                                        >
                                            <EditTwoTone style={{ fontSize: '20px' }} />
                                        </Button>
                                        
                                        <Popconfirm
                                            title='Are you sure to delete this user?'
                                            onConfirm={() => onDelete(record.key)}
                                            okText='Yes'
                                            cancelText='No'
                                        >
                                            <Button 
                                                type='link'
                                                icon={<DeleteOutlined style={{ color: 'red'}} />}
                                            />
                                        </Popconfirm>
                                    </div>
                                );
                            }
                        }

                    ]}
                />
            </div>
        </Card>
    );
}