import React, { useState } from 'react';
import { Form } from 'antd';

import moment from 'moment';

import FilterModal from './FilterModal';
import { useTracked } from 'context';

export default function FilterModalContainer({visible, setVisible}) {
    const store = useTracked()[0];

    const [form] = Form.useForm();
    const onCreate = values => {
        setVisible(false);
        if (values.startDate) {
            values.startDate = moment(values.startDate).format('YYYY-MM-DD');
        }
        if (values.endDate) {
            values.endDate = moment(values.endDate).format('YYYY-MM-DD');
        }
        console.log(values);
        // Api call
    };
    const onOk = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(err => console.log('Validate Failed:', err));
    };

    // Date validation
    const defaultRule = {
        required: false,
        message: 'start date is required'
    };
    const [dateRule, setDateRule] = useState(defaultRule);

    const validate = ({getFieldValue}) => ({
        validator(rule, value) {
            const sDate = getFieldValue('startDate');
            if (sDate && !value) return Promise.reject('end date is required');
            if (value && !sDate) setDateRule(prev => ({...prev, required: true}));            
            else setDateRule(defaultRule);
            return Promise.resolve();
        }
    });

    const modalProps = {
        visible, onOk, form, setVisible,
        dateRule, validate,
        programmes: store.keyProgrammes,
        groups: store.targetGroups,
        regions: store.targetRegions
    };
    return <FilterModal {...modalProps} />
}