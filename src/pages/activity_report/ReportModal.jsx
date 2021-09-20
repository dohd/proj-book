import React from 'react';
import { Modal, Table, Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export default function ReportModal(props) {
    const {
        visible, setVisible, record, 
        setRespState, setImageState
    } = props;

    const toggleResponseView = record => {
        setVisible(false);
        setRespState(prev => ({...prev, record, visible: true}));
    };
    const toggleImageView = record => {
        setVisible(false);
        setImageState(prev => ({...prev, record, visible: true}));
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
                                <Dropdown
                                    overlay={
                                        <Menu>
                                            <Menu.Item 
                                                key='response' 
                                                onClick={() => toggleResponseView(record)}
                                            >
                                                Response
                                            </Menu.Item>
                                            <Menu.Item 
                                                key='response' 
                                                onClick={() => toggleImageView(record)}
                                            >
                                                Image
                                            </Menu.Item>
                                        </Menu>
                                    }
                                >
                                    <Button type='link' size='large'>
                                        action <DownOutlined />
                                    </Button>
                                </Dropdown>
                            );
                        }
                    }
                ]}
            />
        </Modal>
    );
}