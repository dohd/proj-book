import React from 'react';
import { Button, Card, Space, Table } from 'antd';
import { ArrowLeftOutlined, FilePdfOutlined } from '@ant-design/icons';

import { components, editableColumns } from './EditableTable';

export default function Response(props) {
    const {
        toggleReportView, columns, dataSource, caseStudy,
        onExport
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
                <p>Case study</p>
                <p>&bull;&nbsp;{caseStudy}</p>
            </div>
            
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