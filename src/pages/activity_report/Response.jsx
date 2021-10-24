import React from 'react';
import { Button, Card, Space, Table, Modal, Input, Form } from 'antd';
import { ArrowLeftOutlined, FilePdfOutlined, EditOutlined } from '@ant-design/icons';

import { components, editableColumns } from './EditableTable';

export default function Response(props) {
    const {
        toggleReportView, columns, dataSource, caseStudy,
        onExport, visible, setVisible, onOk, form
    } = props;

    return (
        <Card
            bordered={false}
            style={{overflowX: 'auto'}}
            title={
                <Space>
                    <ArrowLeftOutlined 
                        onClick={toggleReportView}
                        style={{fontSize: '18px'}} 
                    />                       
                    Report Response
                </Space>  
            }
            extra={
                <Button
                    type='default' 
                    onClick={onExport}
                    icon={<FilePdfOutlined />}
                >
                    <span className='btn-text-none'>Export</span>
                </Button>
            }
        >
            <div>
                <div style={{padding: '0 0 1em 1em'}}>
                    <span>Case study</span>
                    <Button
                        type='default' 
                        onClick={() => setVisible(true)}
                        icon={<EditOutlined />}
                        size='small'
                        style={{marginLeft: '.5em'}}
                    />
                </div>                
                <ul><li>{caseStudy}</li></ul>
            </div>
            <Modal
                title='Edit Case study'
                visible={visible}
                onOk={onOk}
                okText='Update'
                onCancel={() => setVisible(false)}
            >
                <Form form={form} initialValues={{caseStudy}}>
                    <Form.Item
                        name="caseStudy"
                        label="Case Study"
                        required={true}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            
            <div style={{overflowX: 'auto'}}>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    dataSource={dataSource}
                    columns={[
                        {
                            title: 'Question',
                            key: 'query',
                            dataIndex: 'query',
                        },
                        {
                            title: 'Task Response',
                            children: editableColumns(columns)
                        },
                    ]}
                />
            </div>
        </Card>
    );
}