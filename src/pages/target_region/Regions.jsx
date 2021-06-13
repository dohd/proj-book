import React, { useState, useRef } from 'react';
import { Card, Table, Button, Space, Popconfirm } from 'antd';
import {
    PlusOutlined, EditTwoTone, DeleteOutlined,
    FilePdfOutlined
} from '@ant-design/icons';

import CreateRegion from './AddRegionModal';
import UpdateRegion from './EditRegionModal';
import { customSearch } from 'utils';

export default function Regions(props) {
    const { 
        visible, setVisible, showModal, 
        showUpdateModal, onDelete, onExport, state,
        fetchTargetRegions
    } = props;

    // custom search filter 
    const [search, setSearch] = useState({text: '', column: ''});
    const searchInput = useRef();
    const getColumnSearchProps = customSearch(search, setSearch, searchInput, 250);

    return (
        <Card
            title='Region of Implementation'
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
            <CreateRegion
                visible={visible.create}
                setVisible={setVisible}
                fetchTargetRegions={fetchTargetRegions}
            />
            <UpdateRegion
                record={state.record} 
                visible={visible.update}
                setVisible={setVisible}
                fetchTargetRegions={fetchTargetRegions}
            />
            <Table 
                dataSource={state.regions}
                columns={[
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
                                        title='Are you sure to delete this region?'
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
                                </div>
                            );
                        }
                    }
                ]}
            />
        </Card>
    );
}