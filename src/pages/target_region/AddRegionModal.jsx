import React from 'react';
import { Form, Input, Modal } from 'antd';

import Api from 'api';

export default function AddRegionModal(props) {
    const { fetchTargetRegions, visible, setVisible } = props;

    const [form] = Form.useForm();
    const onCreate = values => {
        setVisible(prev => ({...prev, create: false}));
        values.area = values.region.split(' ')
        .filter(v => v)
        .join(' ');
        
        Api.targetRegion.post(values)
        .then(res => {
            if (!res) return;
            form.resetFields();
            fetchTargetRegions()
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
            title='Add Region'
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
                    label='Region'
                    name='region'
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
}