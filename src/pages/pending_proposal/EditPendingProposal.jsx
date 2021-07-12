import React from 'react';
import { useHistory } from 'react-router-dom';
import { 
    Card, Form, Input, Button, Row, Col, DatePicker, 
    Select, InputNumber, Radio
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import './editProposal.css';

export const dateFormat = 'YYYY-MM-DD';

export default function EditPendingProposal(props) {
    const { form, onFinish, onFinishFailed, donors } = props;
    const history = useHistory();

    const donorList = donors.map(({id, name}, i) => (
        <Select.Option key={i} value={id}>{ name }</Select.Option>
    ));

    return (
        <Card       
            title={
                <span>
                    <ArrowLeftOutlined 
                        onClick={() => history.goBack()}
                        style={{fontSize: '18px'}} 
                    />&nbsp;
                    Update Pending Proposal
                </span>       
            }
        >
            <Form
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}        
                initialValues={{ remember: true }}
                className='edit-proposal-form'
            > 
                <Form.Item
                    wrapperCol={{ span: 14 }}
                    label='Project Title'
                    name='title'
                    rules={[{ required: true }]}
                >
                    <Input maxLength={40} />
                </Form.Item>

                <Row>
                    <Col xs={24} sm={11} >
                        <Form.Item
                            label='Period'
                            name='period'
                            rules={[{ required: true }]}
                        >
                            <DatePicker.RangePicker format={dateFormat} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={11}>
                        <Form.Item
                            label='Date Submitted'
                            name='dateSubmitted'
                            rules={[{ 
                                required: true, 
                                message: 'submitted date is required' 
                            }]}
                        >
                            <DatePicker format={dateFormat} />                       
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    wrapperCol={{ span: 14 }}
                    label='Donor'
                    name='donorId'
                    rules={[{ 
                        required: true, 
                        message: 'donor is required' 
                    }]}
                >
                    <Select placeholder='Select donor'>
                        { donorList }
                    </Select>
                </Form.Item>

                <Form.Item
                    wrapperCol={{ span: 6 }}
                    label='Budget'
                    name='budget'
                    rules={[{ required: true }]}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label='Status'
                    name='status'
                >
                    <Radio.Group>
                        <Radio value={0}>Pending</Radio>
                        <Radio value={1}>Approved</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 7 }}>
                    <Button
                        type='primary'
                        htmlType='submit'
                        className='edit-proposal-submit-btn'
                        block
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}