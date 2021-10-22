import React from 'react';
import { Modal, Table, Button, Dropdown, Menu, Space, Popconfirm } from 'antd';
import { DownOutlined, DeleteOutlined } from '@ant-design/icons';

export default function ReportModal(props) {
    const {
        visible, setVisible, record, 
        setResponseState, setImageState,
        onDelete
    } = props;

    const toggleResponseView = record => {
        setVisible(false);
        setResponseState(prev => ({...prev, record, visible: true}));
        sessionStorage['reportKey'] = record.key;
    };
    const toggleImageView = record => {
        setVisible(false);
        setImageState(prev => ({...prev, record, visible: true}));
        sessionStorage['reportKey'] = record.key;
        sessionStorage['imageState'] = true;
    };

    return (
        <Modal
            title='Reports'
            visible={visible}
            okButtonProps={{ disabled: true }}
            onCancel={() => setVisible(false)}
        >   
            <Table
                pagination={false}
                dataSource={record}
                columns={[
                    {   
                        title: 'Title',
                        dataIndex: 'title',
                        key: 'title'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        render: (text, record) => {
                            return (
                                <Space>
                                    <Dropdown
                                        overlay={
                                            <Menu>
                                                <Menu.Item key='response' onClick={() => toggleResponseView(record)}>
                                                    Response
                                                </Menu.Item>
                                                <Menu.Item key='image' onClick={() => toggleImageView(record)}>
                                                    Image
                                                </Menu.Item>
                                            </Menu>
                                        }
                                    >
                                        <Button type='link' size='large'>
                                            action <DownOutlined />
                                        </Button>
                                    </Dropdown>

                                    <Popconfirm
                                        title='Are you sure to delete this report ?'
                                        onConfirm={() => onDelete(record.key)}
                                        okText='Yes'
                                        cancelText='No'
                                    >
                                        <Button type='link' icon={<DeleteOutlined style={{color: 'red'}} />} />
                                    </Popconfirm>    
                                </Space>
                            );
                        }
                    }
                ]}
            />
        </Modal>
    );
}