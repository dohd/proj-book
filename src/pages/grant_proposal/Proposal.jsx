import React, { useRef, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { 
    Card, Table, Button, Tag, Menu, Dropdown, 
    Space, Popconfirm 
} from 'antd';
import { 
    PlusOutlined, FilePdfOutlined,
    DownOutlined, DeleteOutlined
} from '@ant-design/icons';

import ApprovedProposal from './ApprovedProposalModal';
import { Path } from 'routes';
import { customSearch, parseUrl } from 'utils';

export default function Proposal(props) {
    const {
        onDelete, visible, setVisible,
        showModal, state, setPendingObj, 
        setApprovedObj, fetchProposals, onExport
    } = props;

    const history = useHistory();

    // custom search filter 
    const [search, setSearch] = useState({text: '', column: ''});
    const searchInput = useRef();
    const getColumnSearchProps = customSearch(search, setSearch, searchInput, 188);
    
    return (
        <Card 
            title='Grant Proposals' 
            bordered={false}
            extra={
                <Space>
                    <Button 
                        type='primary' 
                        icon={<PlusOutlined />} 
                        onClick={() => history.push(Path.createProposal)}
                    >
                        Create           
                    </Button>
                    <Button type='primary' onClick={onExport}>
                        <FilePdfOutlined />Export           
                    </Button>
                </Space>    
            } 
        >
            <ApprovedProposal 
                visible={visible}
                setVisible={setVisible}
                record={state.record}
                fetchProposals={fetchProposals}
            />

            <Table 
                dataSource={state.proposals} 
                columns={[
                    {
                        title: 'Project Title',
                        dataIndex: 'title',
                        key: 'title',
                        ...getColumnSearchProps('title')
                    },
                    {
                        title: 'Period (Start - End)',
                        dataIndex: 'period',
                        key: 'period',
                        render: (text, record) => {
                            const {startPeriod, endPeriod} = record;
                            return (
                                <span>
                                    <div style={{display: 'inline-block'}}>
                                        { startPeriod }
                                    </div> &nbsp;
                                    <div style={{display: 'inline-block'}}>
                                        { endPeriod }
                                    </div>
                                </span>
                            );
                        }
                    },
                    {
                        title: 'Budget (ksh.)',
                        dataIndex: 'budget',
                        key: 'budget',
                        render: text => text.toLocaleString()
                    },
                    {
                        title: 'Date Submitted',
                        dataIndex: 'dateSubmitted',
                        key: 'dateSubmitted'
                    },
                    {
                        title: 'Status',
                        dataIndex: 'status',
                        key: 'status',
                        filters: [
                            { text: 'Pending', value: 0 },
                            { text: 'Approved', value: 1 }
                        ],
                        onFilter: (value, record) => (record.status === value),
                        render: text => {
                            const color = text === 1 ? 'geekblue' : 'green';
                            return (
                                <Tag color={color}>
                                { text === 1 ? 'Approved':'Pending' }
                                </Tag>
                            );                            
                        }
                    },
                    {
                        title: 'Donor',
                        dataIndex: 'donor',
                        key: 'donor',
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 180,
                        render: (text, record) => {
                            const {key, status} = record;
                            if (status === 1) return (
                                <Dropdown
                                    overlay={
                                        <Menu>
                                            <Menu.Item onClick={() => showModal(record)}>
                                                Update
                                            </Menu.Item>
                                            <Menu.Item>
                                                <Link to={() => setApprovedObj(key)}>
                                                    Objectives
                                                </Link>
                                            </Menu.Item>
                                        </Menu>
                                    }
                                >   
                                    <Button type='link'>
                                        actions <DownOutlined />
                                    </Button>
                                </Dropdown>
                            );
                            
                            const params = {proposalId: key}
                            const path = parseUrl(Path.updateProposal, params);
                            return (
                                <div>
                                    <Dropdown
                                        overlay={
                                            <Menu>
                                                <Menu.Item>
                                                    <Link to={path}>Update</Link>
                                                </Menu.Item>
                                                <Menu.Item>
                                                    <Link to={() => setPendingObj(key)}>
                                                        Objectives
                                                    </Link>
                                                </Menu.Item>
                                            </Menu>
                                        }
                                    >   
                                        <Button type='link'>
                                            actions <DownOutlined />
                                        </Button>
                                    </Dropdown>
                                    <Popconfirm
                                        title='Are you sure to delete this proposal?'
                                        onConfirm={() => onDelete(key)}
                                        okText='Yes'
                                        cancelText='No'
                                    >
                                        <Button 
                                            type='link'
                                            icon={
                                                <DeleteOutlined style={{ color: 'red' }}/>
                                            }
                                        />
                                    </Popconfirm>
                                </div>
                            );
                        }
                    },
                ]}  
            />
        </Card>
    );
} 