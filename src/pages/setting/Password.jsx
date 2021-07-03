import React from 'react';
import { Form, Row, Col, Button, Input } from 'antd';

const layout = { wrapperCol: { span: 22 } };

export default function Password(props) {
    const {form, onFinish, onFinishFailed, confirmValidator} = props;
    return (
        <Form 
            {...layout} 
            form={form}
            layout='vertical' 
            requiredMark={false}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <legend>Change Password</legend>
            <Row >
                <Col xs={24} sm={7}>
                    <Form.Item 
                        label='Password'
                        name='password'
                        rules={[{ required: true }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={7}>
                    <Form.Item 
                        label='New Password'
                        name='newPassword'
                        rules={[{
                            required: true,
                            message: 'new password is required'
                        }]}
                    >
                        <Input.Password /> 
                    </Form.Item>
                </Col>
                <Col xs={24} sm={7}>
                    <Form.Item 
                        label='Confirm'
                        name='confirm'
                        dependencies={['newPassword']}
                        rules={[
                            {
                                required: true,
                                message: 'confirm your password!'
                            },
                            confirmValidator
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={3}>
                    <Form.Item>
                        <Button 
                            type='primary' 
                            htmlType='submit'
                            style={{ marginTop: '2em' }}
                        >
                            Change
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}