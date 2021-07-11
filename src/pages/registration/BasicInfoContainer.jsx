import React, { useEffect } from 'react'
import { Form } from 'antd';

import BasicInfo from './BasicInfo';

export default function BasicInfoContainer({state, setState}) {
    const [form] = Form.useForm();
    const onFinish = values => {
        setState(prev => ({
            ...prev,
            register: values,
            profile: !prev.profile
        }));
        form.resetFields(['password']);
    };
    const onFinishFailed = err => console.log('Error:', err);

    useEffect(() => {
        const { register } = state;
        if (register.hasOwnProperty('orgName')) {
            form.setFieldsValue({
                orgName: register.orgName,
                username: register.username,
                email: register.email,
                password: register.password,
                confirm: register.confirm
            });
        }
    }, [state, form]);


    const props = {form, onFinish, onFinishFailed};
    return <BasicInfo {...props} />;
}