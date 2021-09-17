import React from 'react';
import { Modal, Form, Select, DatePicker, Row } from 'antd';

export default function FilterModal(props) {
    const {
        visible, onOk, form, setVisible,
        programmes, regions, groups,
        dateRule, validate
    } = props;
    
    const programmesOpt = programmes.map(v => (
        <Select.Option key={v.id} value={v.id}>{v.programme}</Select.Option>
    ));
    const regionsOpt = regions.map(v => (
        <Select.Option key={v.id} value={v.id}>{v.area}</Select.Option>
    ));
    const groupsOpt = groups.map(v => (
        <Select.Option key={v.id} value={v.id}>{v.group}</Select.Option>
    ));
    
    return (
        <Modal
            title='Columns'
            visible={visible}
            onOk={onOk}
            onCancel={() => setVisible(false)}
            okText='Apply'
        >
            <Form
                form={form}
                initialValues={{ remember: true }}
                layout='vertical'
            >
                <Form.Item label='Programme' name='programme'>
                    <Select>{ programmesOpt }</Select>
                </Form.Item>
                <Form.Item label='Region' name='region'>
                    <Select>{ regionsOpt }</Select>
                </Form.Item>
                <Form.Item label='Group' name='group'>
                    <Select>{ groupsOpt }</Select>
                </Form.Item>
                <Form.Item label='Date'>
                    <Row>
                        <Form.Item 
                            name='startDate'
                            rules={[dateRule]}
                        >
                            <DatePicker
                                placeholder='Start date'
                                style={{marginRight: '5px'}}
                            />
                        </Form.Item>
                        <Form.Item 
                            name='endDate'
                            dependencies={['startDate']}
                            rules={[validate]}
                        >
                            <DatePicker
                                placeholder='End date'
                            />
                        </Form.Item>
                    </Row>
                </Form.Item>
            </Form>
        </Modal>
    );
}
