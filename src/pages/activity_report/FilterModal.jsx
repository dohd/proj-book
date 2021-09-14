import React from 'react';
import { Modal, Form, Select, DatePicker } from 'antd';

export default function FilterModal(props) {
    const {
        visible, onOk, form, setVisible,
        programmes, regions, groups
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
                <Form.Item label='Date' name='date'>
                    <DatePicker.RangePicker />
                </Form.Item>
            </Form>
        </Modal>
    );
}
