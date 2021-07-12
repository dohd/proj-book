import React, { useState, useRef } from 'react';
import { Card, Table, Button, Space, Popconfirm } from 'antd';
import {
    PlusOutlined, EditTwoTone, DeleteOutlined,
    FilePdfOutlined
} from '@ant-design/icons';

import AddProgramme from './AddProgrammeModal';
import EditProgramme from './EditProgrammeModal';
import { customSearch } from 'utils';

export default function KeyProgrammes(props) {
    const {
        state, visible, setVisible, onExport,
        showModal, showUpdateModal, onDelete,
        fetchKeyProgrammes
    } = props;

    // custom search filter 
    const [search, setSearch] = useState({ text: '', column: '' });
    const searchInput = useRef();
    const getColumnSearchProps = customSearch(search, setSearch, searchInput, 400);

    return (
        <Card
            title='Key Programmes'
            bordered={false}
            extra={
                <Space>
                    <Button
                        type='primary'
                        onClick={showModal}
                        icon={<PlusOutlined />}
                    >
                        <span className='btn-text-none'>Add</span>
                    </Button>
                    <Button
                        type='default'
                        onClick={onExport}
                        icon={<FilePdfOutlined />}
                    >
                        <span className='btn-text-none'>Export</span>
                    </Button>
                </Space>
            }
        >
            <AddProgramme
                visible={visible.create}
                setVisible={setVisible}
                fetchKeyProgrammes={fetchKeyProgrammes}
            />
            <EditProgramme
                record={state.record}
                visible={visible.update}
                setVisible={setVisible}
                fetchKeyProgrammes={fetchKeyProgrammes}
            />

            <Table
                dataSource={state.programmes}
                columns={[
                    {
                        title: 'Programme',
                        dataIndex: 'programme',
                        key: 'programme',
                        ...getColumnSearchProps('programme')
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        render: (text, record) => {
                            return (
                                <div style={{minWidth: '100px'}}>
                                    <Button
                                        type='link'
                                        onClick={() => showUpdateModal(record)}
                                    >
                                        <EditTwoTone style={{ fontSize: '20px' }} />
                                    </Button>
                                    <Popconfirm
                                        title='Are you sure to delete this programme?'
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