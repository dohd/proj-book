import React, { useRef, useState } from 'react';
import { 
    Card, Table, Button, Space, Popconfirm, Dropdown, 
    Menu 
} from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';
import { 
    PlusOutlined, EditTwoTone, DeleteOutlined, 
    ArrowLeftOutlined, DownOutlined, FilePdfOutlined
} from '@ant-design/icons';

import './participants.css';
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
            className='participants-card'
            title={
                <span>
                    <ArrowLeftOutlined 
                        onClick={() => history.goBack()}
                        style={{ fontSize: '18px' }}
                    />&nbsp;
                    Participants
                </span>
            }
            extra={
                <Space>
                    <Link to={addParticipantPath} className='add-part-link'>
                        <Button type='primary' icon={<PlusOutlined />}>
                            <span className='btn-text-none'>Add</span> 
                        </Button>    
                    </Link>  

                    <Dropdown
                        overlay={
                            <Menu>
                                <Menu.Item key='agenda'>
                                    {
                                        participants.length &&
                                        <Link to={agendaPath}>
                                            View agenda
                                        </Link>
                                    }
                                </Menu.Item>
                                <Menu.Item key='export' onClick={onExport}>
                                    <FilePdfOutlined /> Export participants
                                </Menu.Item>                                
                            </Menu>
                        }
                    >   
                        <span className='part-more-text'>
                            More&nbsp;<DownOutlined />
                        </span>
                    </Dropdown>
                </Space>
            }
        >   
            <div className='participants-table-wrapper'>
                <Table 
                    dataSource={participants}
                    columns={[
                        {
                            title: 'Activity Date',
                            dataIndex: 'activityDate',
                            key: 'activityDate',
                            ...getColumnSearchProps('activityDate'),
                            render: text => <div style={{minWidth: '100px'}}>{text}</div>
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
                            render: (text, {key}) => {
                                const obj = { participantId: key, ...params };
                                const editPath = parseUrl(Path.updateParticipant, obj);
                                return (
                                    <div style={{minWidth: '100px'}}>
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
            </div>
        </Card>
    );
}
