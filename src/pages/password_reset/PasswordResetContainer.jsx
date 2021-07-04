import React, { useState } from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';

import './passwordReset.css';
import Api from 'api';
import { Path } from 'routes';

export default function PasswordResetContainer({history}) {
    const params = useParams();
    const  [isLoading, setLoading] = useState(false);

    const onFinish = values => {
        setLoading(true)
        Api.recoveryPassword.post({...values, ...params})
        .then(res => {
            if (res) {
                message.success('Password successfully updated');
                history.push(Path.login);    
            }
        })
        .catch(err => setLoading(false));
    };
    const onFinishFailed = err => console.log('Error:',err);

    const confirmValidator = ({getFieldValue}) => ({
        validator: (rule, value) => {
            const isValid = !value || getFieldValue('password') === value;
            if(isValid) return Promise.resolve();            
            return Promise.reject('passwords do not match!');
        }
    });

    return (
        <div className='landing-container'>
            <div className='pass-reset'>
                <Card   
                    title='Reset Password'
                >
                    <Form
                        layout='vertical'
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        initialValues={{ remember: true }}
                    >                  
                        <Form.Item 
                            label='Password' 
                            name='password'
                            rules={[{ required: true }]}
                        >
                            <Input.Password prefix={<LockOutlined />} />
                        </Form.Item>
                        <Form.Item 
                            label='Confirm' 
                            name='confirm'
                            dependencies={['password']}
                            rules={[
                                {
                                    required: true,
                                    message: 'confirm your password!'
                                },
                                confirmValidator
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} />
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
                                Reset
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    );
}