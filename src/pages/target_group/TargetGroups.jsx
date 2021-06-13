import React, { useState, useRef } from 'react';
import { Card, Table, Button, Space, Popconfirm } from 'antd';
import { 
    PlusOutlined, EditTwoTone, DeleteOutlined, 
    FilePdfOutlined
} from '@ant-design/icons';

import CreateGroup from './AddGroupModal';
import UpdateGroup from './EditGroupModal';
import { customSearch } from 'utils';

export default function TargetGroups(props) {
    const { 
        visible, setVisible, showUpdateModal, state, 
        onDelete, showModal, onExport, fetchTargetGroups
    } = props;

    // custom search filter 
    const [search, setSearch] = useState({text: '', column: ''});
    const searchInput = useRef();
    const getColumnSearchProps = customSearch(search, setSearch, searchInput, 250);

    return (
        <Card
            title='Target Groups'
            bordered={false}
            extra={
                <Space>
                    <Button type='primary' onClick={showModal}>
                        <PlusOutlined />Create
                    </Button>
                    <Button type='primary' onClick={onExport}>
                        <FilePdfOutlined />Export
                    </Button>
                </Space>
            }
        >
            <CreateGroup 
                visible={visible.create}
                setVisible={setVisible}
                fetchTargetGroups={fetchTargetGroups}
            />
            <UpdateGroup
                record={state.record} 
                visible={visible.update}
                setVisible={setVisible}
                fetchTargetGroups={fetchTargetGroups}
            />
                <Table 
                    dataSource={state.groups}
                    columns={[
                        {
                            title: 'Group',
                            dataIndex: 'group',
                            key: 'group',
                            ...getColumnSearchProps('group')
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
                                            title='Are you sure to delete this group?'
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
                                    </div>
                                );
                            }
                        }

                    ]}
                />
        </Card>
    );
}