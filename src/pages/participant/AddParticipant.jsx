import React from 'react';
import { 
    Card, Form, Space, Input, DatePicker, 
    Button, Col, Row, Select 
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';

import './addParticipant.css';

export const dateFormat = 'YYYY-MM-DD';

export default function AddParticipant(props) {
    const { form, onFinish, onFinishFailed, state } = props;
    const history = useHistory();

    const checkName = (rule, value) => {
        const regex = new RegExp(/^([a-zA-Z]{2,})\s([a-zA-Z]{2,})$/);
        if (!value) return Promise.reject('name is required');
        if (!regex.test(value)) return Promise.reject('first and last name is required');
        return Promise.resolve();
    };

    const regionList = state.regions.map(v => (
        <Select.Option key={v.id} value={v.id}>
            { v.area }
        </Select.Option>
    ));

    return (
        <Card 
            title={
                <Space>
                    <ArrowLeftOutlined
                        onClick={() => history.goBack()} 
                        style={{ fontSize: '18px' }} 
                    /> Add Participant
                </Space>       
            }
        >
            <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={{ remember: true }}
                style={{ marginLeft: '5%' }}
            >
                <Row gutter={16}>
                    <Col xs={24} sm={11}>
                        <Form.Item
                            label={<Space>Name</Space>}
                            name='name'
                            rules={[{
                                required: true, 
                                validator: checkName
                            }]}
                        >
                            <Input placeholder='e.g John Doe' />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={11}>
                        <Form.Item
                            wrapperCol={{ span: 8 }}
                            label={<Space>Gender</Space>}
                            name='gender'
                        >
                            <Select placeholder='Select gender'>
                                <Select.Option value='M'>Male</Select.Option>
                                <Select.Option value='F'>Female</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                
                <Form.Item
                    wrapperCol={{ span: 12 }}
                    label='Disability'
                    name='disability'
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    wrapperCol={{ span: 12 }}
                    label='Key Programme'
                    name='keyProgramme'
                >
                    <Input readOnly />
                </Form.Item>

                <Row gutter={16}>
                    <Col xs={24} sm={10}>
                        <Form.Item
                            wrapperCol={{ span: 14 }}
                            label={<Space>Phone</Space>}
                            name='phone'
                            rules={[{ required: true}]}
                        >
                            <Input type='tel' maxLength={15} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={11}>
                        <Form.Item
                            wrapperCol={{ span: 14 }}
                            label={<Space>Email</Space>}
                            name='email'
                            rules={[{ required: true }]}
                        >
                            <Input type='email' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={24} sm={10}>
                        <Form.Item
                            label='Designation'
                            name='designation'
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={11}>
                        <Form.Item
                            wrapperCol={{ span: 14 }}
                            label={<Space>Region</Space>}
                            name='regionId'
                            rules={[{ 
                                required: true,
                                message: 'region is required' 
                            }]}
                        >
                            <Select placeholder='Select region'>
                                { regionList }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    label={<Space>Activity Date</Space>}
                    name='activityDate'
                    rules={[{ required: true }]}
                >
                    <DatePicker format={dateFormat} />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 7 }}>
                    <Button
                        type='primary'
                        htmlType='submit'
                        className='add-part-submit-btn'
                        block
                    >
                        Submit
                    </Button>
                </Form.Item> 
            </Form>
        </Card>
    );
}