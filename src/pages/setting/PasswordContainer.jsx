import React from 'react';
import { Form, message } from 'antd';

import Password from './Password';
import Api from 'api';

export default function PasswordContainer() {
    const [form] = Form.useForm();
    const onFinish = values => {
        Api.resetPassword.post(values)
        .then(res => message.success('Password updated successfully'))
        .catch(err => {
            console.log(err);
            message.error('Unknown error!');
        });
        form.resetFields();
    };
    const onFinishFailed = err => console.log('Error:',err);

    const confirmValidator = ({ getFieldValue }) => ({
        validator(rule, value) {
            const isValid = !value || getFieldValue('newPassword') === value;
            if(isValid) return Promise.resolve();
            return Promise.reject('passwords do not match!');
        }
    });

    const props = {form, onFinish, onFinishFailed, confirmValidator};
    return <Password {...props} />;
}