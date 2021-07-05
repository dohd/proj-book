import React from 'react';
import { Upload } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';

import { isAdmin } from 'api';

export default function ChangeAvatar(props) {
    const {loading, url, handleBeforeUpload} = props;
    
    const profileStatus = () => {
        return (
            loading ? <LoadingOutlined />:
            url ? <img src={url} alt='event' style={{ width: '100%' }} />:
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
                    disabled={!isAdmin()}
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