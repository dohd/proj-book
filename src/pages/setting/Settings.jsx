import React from 'react';
import { Card, Form, Input, Button, Row, Col, Space } from 'antd';

import PasswordContainer from './PasswordContainer';
import ChangeAvatarContainer from './ChangeAvatarContainer';

const layout = { wrapperCol: { span: 16 } };

export default function Settings(props) {
    const { form, onSave, restrict } = props;    
    return (
        <Card
            title='Settings'
            extra={
                <Button 
                    type='primary' 
                    onClick={onSave}
                    disabled={restrict}
                >
                    Save
                </Button>
            }
        >
            <ChangeAvatarContainer />

            <Form 
                {...layout}  
                form={form} 
                requiredMark={false}
            >
                <legend>Organisation</legend>
                <Form.Item 
                    label='Name'
                    name='orgName' 
                    labelCol={{ span: 3 }}
                    rules={[{ 
                        required: true,
                        message: 'name is required'
                    }]}
                >
                    <Input readOnly={restrict} />
                </Form.Item>
                <Row>
                    <Col xs={24} sm={12}>
                        <Form.Item 
                            label={<Space>Telephone</Space>}
                            name='orgTelephone'
                            rules={[{ 
                                required: true,
                                message: 'telephone is required'
                            }]}
                        >
                            <Input type='tel' maxLength={15} readOnly={restrict} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item 
                            label='Email'
                            name='orgEmail'
                            rules={[{ 
                                required: true,
                                message: 'email is required'
                            }]}
                        >
                            <Input type='email' readOnly={restrict} />
                        </Form.Item>
                    </Col>
                </Row>

                <legend>Contact Person</legend>
                <Row>
                    <Col xs={24} sm={12}>
                        <Form.Item 
                            label={<Space>First Name</Space>}
                            name='fName'
                            rules={[{ 
                                required: true,
                                message: 'first name is required'
                            }]}
                        >
                            <Input readOnly={restrict} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item 
                            label='Last Name' 
                            name='lName'
                            rules={[{ 
                                required: true,
                                message: 'last name is required'
                            }]}
                        >
                            <Input readOnly={restrict} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={12}>
                        <Form.Item 
                            label={<Space>Telephone</Space>}
                            name='cpTelephone'
                            rules={[{ 
                                required: true,
                                message: 'telephone is required'
                            }]}
                        >
                            <Input type='tel' maxLength={15} readOnly={restrict} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item 
                            label={<Space>Email</Space>}
                            name='cpEmail'
                            rules={[{ 
                                required: true,
                                message: 'email is required'
                            }]}
                        >
                            <Input type='email' readOnly={restrict} />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

            <PasswordContainer />
        </Card>
    );
}