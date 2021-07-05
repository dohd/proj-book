import React, { useState } from 'react';
import { Card, Form, Input, Button, Space, message } from 'antd';
import { ArrowLeftOutlined, MailOutlined } from '@ant-design/icons';

import './passwordRecover.css';
import Api from 'api';

export default function PasswordRecoverContainer({history}) {
    const [isLoading, setLoading] = useState(false);
    
    const [form] = Form.useForm();
    const onFinish = values => {
        setLoading(true);
        Api.recoverPassword.post(values)
        .then(res => {
            setLoading(false);
            if (!res) return;
            message.success(`Reset link has been sent to ${res.email}`);
            form.resetFields();
        });
    };
    const onFinishFailed = err => console.log('Error:',err);

    return (
        <div className='landing-container'>
            <div className='pass-recover'>
                <Card   
                    title={
                        <Space>
                            <ArrowLeftOutlined
                                onClick={() => history.goBack()}
                                style={{ fontSize: '18px' }}
                            />
                            Recover Password
                        </Space>
                    }
                >
                    <Form
                        form={form}
                        layout='vertical'
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        initialValues={{ remember: true }}
                    >
                        <Form.Item 
                            label='Email'
                            labelCol={{ span: 8 }} 
                            wrapperCol={{ span: 24 }}
                            name='email'
                            rules={[{ required: true }]}
                            required={false}
                        >
                            <Input type='email' prefix={<MailOutlined />} />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{ span: 24 }}
                        >
                            <Button 
                                loading={isLoading}
                                type='primary' 
                                htmlType='submit' 
                                block
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
}