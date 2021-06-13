import React, { useEffect } from 'react';
import { Form } from 'antd';

import Tab5 from './Tab5';

export default function Tab5Container(props) {
    const {nextTab, prevTab, state, setState} = props;

    const [form] = Form.useForm();
    const onFinish = values => {
        const { study } = values;
        setState(prev => {
            if (!study) return prev;
            return {...prev, formI: {...prev.formI, study}};
        });
        nextTab();
    };
    const onFinishFailed = err => console.log('Error:', err);

    useEffect(() => {
        const { study } = state.formI;
        if (study) form.setFieldsValue({ study });
    }, [state, form]);

    const params = {
        form, onFinish, onFinishFailed,
        prevTab
    };
    return <Tab5 {...params} />;
}
