import React from 'react';
import { Modal, Table, Button, Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { Path } from 'routes';
import { parseUrl } from 'utils';

export default function ReportModal(props) {
    const {visible, setVisible, record } = props;

    const MenuItem = (key, title, to) => (
        <Menu.Item key={key}>
            <Link 
                to={to} 
                style={{color: 'rgba(0, 0, 0, 0.85)'}}
            >
                { title }
            </Link>
        </Menu.Item>
    );

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
                        render: (text, {key}) => {
                            const params = { narrativeReportId: key };
                            const respPath = parseUrl(Path.reportResponses, params);
                            const imagePath = parseUrl(Path.reportImages, params);                            
                            return (
                                <Dropdown
                                    overlay={
                                        <Menu>
                                            { MenuItem('response', 'Response', `${respPath}`) }
                                            { MenuItem('image', 'Image', `${imagePath}`) }
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