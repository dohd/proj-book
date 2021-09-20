import React from 'react';
import { Button, Card, Space, Upload, Image } from 'antd';
import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';

export default function ReportImage(props) {
    const { 
        handleBeforeUpload, loading, imageData,
        toggleReportView
    } = props;

    const ImageList = imageData.map(v => (
        <Image key={v.id} width={200} src={v.url} alt='image' />
    ));

    return (
        <Card
            title={
                <Space>
                    <ArrowLeftOutlined 
                        onClick={toggleReportView}
                        style={{fontSize: '18px'}} 
                    />                       
                    Report Images
                </Space>  
            }
            extra={
                <Upload multiple
                    beforeUpload={handleBeforeUpload}
                    showUploadList={false}
                >
                    <Button
                        icon={<UploadOutlined /> }
                        loading={loading}
                    >
                        Upload Image
                    </Button>
                </Upload>
            }
        >
            <Image.PreviewGroup>
                { ImageList }
            </Image.PreviewGroup>
        </Card>
    );
}