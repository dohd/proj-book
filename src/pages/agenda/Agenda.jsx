import React, { useState, useRef } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Card, Button, Space, Table, Popconfirm } from 'antd';
import { 
    PlusOutlined, ArrowLeftOutlined, EditTwoTone, 
    DeleteOutlined
} from '@ant-design/icons';

import CreateAgenda from './AddAgendaModal';
import UpdateAgenda from './EditAgendaModal';
import { Path } from 'routes';
import { customSearch, parseUrl } from 'utils';

export default function Agenda(props) {
    const {
        state, visible, setVisible, showCreateModal, 
        showUpdateModal, onDelete, fetchAgenda
    } = props;
    const history = useHistory();
    const params = useParams();
    
    const reportPath = parseUrl(Path.narrativeReport, params);

    // custom search filter 
    const [search, setSearch] = useState({text: '', column: ''});
    const searchInput = useRef();
    const getColumnSearchProps = customSearch(search, setSearch, searchInput, 300);
    
    return (
        <Card 
            bordered={false}
            title={
                <Space>
                    <ArrowLeftOutlined 
                        onClick={() => history.goBack()}
                        style={{fontSize: '18px'}} 
                    />                       
                    Activity Agenda
                </Space>       
            }       
            extra={
                <Space>
                    <Button type='primary' onClick={showCreateModal}>
                        <PlusOutlined /> Agenda
                    </Button>
                    <Link to={reportPath}>
                        <Button 
                            type='primary'
                            disabled={!state.agenda.length}
                        >
                            Narrative Report
                        </Button>
                    </Link>
                </Space>
            } 
        >   
            <CreateAgenda  
                visible={visible.create}
                setVisible={setVisible}
                fetchAgenda={fetchAgenda} 
            />
            <UpdateAgenda
                visible={visible.update}
                setVisible={setVisible}
                record={state.record}
                fetchAgenda={fetchAgenda}
            />

            <Table 
                dataSource={state.agenda}
                columns={[
                    {
                        title: 'Time',
                        dataIndex: 'time',
                        key: 'time',
                    },
                    {
                        title: 'Task',
                        dataIndex: 'task',
                        key: 'task',
                        ...getColumnSearchProps('task')
                    },
                    {
                        title: 'Responsible Person(s)',
                        dataIndex: 'assignee',
                        key: 'assignee',
                        ...getColumnSearchProps('assignee')
                    },
                    {
                        title: 'Designation',
                        dataIndex: 'designation',
                        key: 'designation'
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
                                        icon={<EditTwoTone style={{ fontSize: '20px' }} />}
                                    />                                                                      
                                    <Popconfirm
                                        title='Are you sure to delete this agenda?'
                                        onConfirm={() => onDelete(record.key)}
                                        okText='Yes'
                                        cancelText='No'
                                    >
                                        <Button
                                            type='link'
                                            icon={
                                                <DeleteOutlined 
                                                    style={{color: 'red', fontSize: '18px'}} 
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
        </Card>
    );
}