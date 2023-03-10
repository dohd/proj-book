import React from 'react';
import { Form, Input, Modal } from 'antd';

import Api from 'api';

export default function AddGroupModal(props) {
    const { fetchTargetGroups, visible, setVisible } = props;

    const [form] = Form.useForm();
    const onCreate = values => {
        setVisible(prev => ({...prev, create: false}));
        values.group = values.group.split(' ')
        .filter(v => v)
        .join(' ');
        
        Api.targetGroup.post(values)
        .then(res => {
            if(!res) return;
            form.resetFields();
            fetchTargetGroups();
        });
    };

    const onOk = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(err => console.log('Validate Failed:', err));
    };
    const onCancel = () => setVisible(prev => ({...prev, create: false}));
    
    return (
        <Modal
            title='Add Group'
            visible={visible}
            onOk={onOk}
            onCancel={onCancel}
            okText='Save'
        >
            <Form
                form={form}
                initialValues={{ remember: true }}
            >
                <Form.Item
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    label='Group'
                    name='group'
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}