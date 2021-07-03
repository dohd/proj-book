import React from 'react';
import { Upload } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';

export default function ChangeAvatar(props) {
    const {loading, url, handleBeforeUpload} = props;
    
    const profileStatus = () => {
        if (loading) return <LoadingOutlined />;
        else if (url) {
            return (
                <img 
                    src={url} 
                    alt='event' 
                    style={{ width: '100%' }} 
                />
            );
        }
        else return (
            <div>
                <UploadOutlined className='settings-upload-outlined' />
                <p className='settings-upload'>Upload</p>
            </div>
        );
    }

    return (
        <div className='settings-avatar-container'>
            <div style={{ width: '9em' }}>
                <Upload
                    beforeUpload={handleBeforeUpload}
                    showUploadList={false}
                    listType='picture-card'
                >
                    { profileStatus() }
                </Upload>
            </div>

            <div className='settings-avatar-content'>
                <h3>Change Profile</h3>  
                <p className='settings-paragraph'>
                    Change organisation profile picture
                </p>
            </div>
        </div>
    );
}