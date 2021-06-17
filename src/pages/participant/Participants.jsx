import React, { useRef, useState } from 'react';
import { 
    Card, Table, Button, Space, 
    Popconfirm, Dropdown, Menu 
} from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';
import { 
    PlusOutlined, EditTwoTone, DeleteOutlined, 
    ArrowLeftOutlined, DownOutlined, FilePdfOutlined
} from '@ant-design/icons';

import { customSearch, parseUrl } from 'utils';
import { Path } from 'routes';

export default function Participants(props) {
    const { participants, onDelete, onExport } = props;
    const history = useHistory();
    const params = useParams();
    const agendaPath = parseUrl(Path.agenda, params);
    const addParticipantPath = parseUrl(Path.createParticipant, params);

    // custom search filter 
    const [search, setSearch] = useState({text: '', column: ''});
    const searchInput = useRef();
    const getColumnSearchProps = customSearch(search, setSearch, searchInput);
            
    return (
        <Card
            bordered={false}
            title={
                <Space>
                    <ArrowLeftOutlined 
                        onClick={() => history.goBack()}
                        style={{ fontSize: '18px' }}
                    /> Activity Participants
                </Space>
            }
            extra={
                <Space>
                    <Button type='primary'>
                        <Link to={addParticipantPath}>
                            <PlusOutlined /> Participant
                        </Link>          
                    </Button>
                    <Dropdown
                        overlay={
                            <Menu>
                                <Menu.Item key='export' onClick={onExport}>
                                    <FilePdfOutlined />Export 
                                </Menu.Item>
                                <Menu.Item key='agenda'>
                                    {
                                        !participants.length ? <span>Agenda</span>:
                                        <Link to={agendaPath}>
                                            Agenda
                                        </Link>
                                    }
                                </Menu.Item>
                            </Menu>
                        }
                    >   
                        <Button type='link'>
                            options <DownOutlined />
                        </Button>
                    </Dropdown>
                </Space>
            }
        >
            <Table 
                className='part-table'
                dataSource={participants}
                scroll={{ x: 1500 }}
                columns={[
                    {
                        title: 'Activity Date',
                        dataIndex: 'activityDate',
                        key: 'activityDate',
                        ...getColumnSearchProps('activityDate')
                    },
                    {
                        title: 'Name',
                        dataIndex: 'name',
                        key: 'name',
                    },
                    {
                        title: 'Gender',
                        dataIndex: 'gender',
                        key: 'gender',
                        filters: [
                            { text: 'Male', value: 'M' },
                            { text: 'Female', value: 'F' },
                        ],
                        onFilter: (value, record) => record.gender === value
                    },
                    {
                        title: 'Disability',
                        dataIndex: 'disability',
                        key: 'disability'
                    },
                    {
                        title: 'Designation',
                        dataIndex: 'designation',
                        key: 'designation'
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
                        title: 'Programme',
                        dataIndex: 'programme',
                        key: 'programme',
                        ...getColumnSearchProps('programme')
                    },
                    {
                        title: 'Region',
                        dataIndex: 'region',
                        key: 'region',
                        ...getColumnSearchProps('region')
                    },
                    {
                        title: 'Action',
                        dataIndex: 'action',
                        key: 'action',
                        fixed: 'right',
                        render: (text, {key}) => {
                            const obj = { participantId: key, ...params };
                            const editPath = parseUrl(Path.updateParticipant, obj);
                            return (
                                <div>
                                    <Link to={editPath}>
                                        <Button
                                            type='link'
                                            icon={
                                                <EditTwoTone 
                                                    style={{ fontSize: '20px' }} 
                                                />
                                            }
                                        />
                                    </Link>
                                    <Popconfirm
                                        title='Are you sure to delete this participant?'
                                        onConfirm={() => onDelete(key)}
                                        okText='Yes'
                                        cancelText='No'
                                    >
                                        <Button type='link'
                                            icon={
                                                <DeleteOutlined 
                                                    style={{ 
                                                        color: 'red', 
                                                        fontSize: '18px' 
                                                    }} 
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
