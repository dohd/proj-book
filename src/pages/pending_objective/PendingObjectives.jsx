import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { 
    Card, Table, Button, Space, Menu, 
    Dropdown, Popconfirm
} from 'antd';
import { 
    ArrowLeftOutlined, FilePdfOutlined, 
    PlusOutlined, DownOutlined, DeleteOutlined
} from '@ant-design/icons';

import EditObjective from './EditObjectiveModal';
import AddObjective from './AddObjectiveModal';

export default function PendingObjectives(props) {
    const { 
        onExport, visible, setVisible, 
        state, showAddModal, onDelete,
        pendingAct, showEditModal,
        fetchProposals,
    } = props;
    const history = useHistory();

    return (
        <Card 
            bordered={false}
            title={
                <span>
                    <ArrowLeftOutlined 
                        onClick={() => history.goBack()} 
                        style={{fontSize: '18px'}}
                    />&nbsp;
                    Pending Objectives
                </span>
            }
            extra={
                <Space>
                    <Button
                        type='primary'
                        onClick={showAddModal}
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
            <EditObjective 
                visible={visible.edit}
                setVisible={setVisible}
                fetchProposals={fetchProposals}
                record={state.record}
            />

            <AddObjective 
                visible={visible.add}
                setVisible={setVisible}
                fetchProposals={fetchProposals}
            />

            <Table 
                dataSource={state.objectives}
                columns={[
                    {
                        title: 'Objective',
                        dataIndex: 'objective',
                        key: 'objective',
                    },
                    {
                        title: 'Action',
                        dataIndex: 'action',
                        key: 'action',
                        render: (text, record) => {
                            const { key } = record;
                            return (
                                <div style={{minWidth: '140px'}}>
                                    <Dropdown
                                        overlay={
                                            <Menu>
                                                <Menu.Item 
                                                    key='update'
                                                    onClick={() => showEditModal(record)}
                                                >
                                                    Update objective
                                                </Menu.Item>
                                                <Menu.Item key='activities'>
                                                    <Link to={pendingAct(key)}>
                                                        View Activities
                                                    </Link>
                                                </Menu.Item>
                                            </Menu>
                                        }
                                    >   
                                        <Button type='link' size='large'>
                                            actions <DownOutlined />
                                        </Button>
                                    </Dropdown>
                                    <Popconfirm
                                        title='Are you sure to delete this objective?'
                                        onConfirm={() => onDelete(key)}
                                        okText='Yes'
                                        cancelText='No'
                                    >
                                        <Button
                                            type='link'
                                            icon={
                                                <DeleteOutlined 
                                                    style={{ color: 'red'}} 
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