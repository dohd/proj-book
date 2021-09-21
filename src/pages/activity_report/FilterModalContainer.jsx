import React, { useState } from 'react';
import { Form } from 'antd';
import moment from 'moment';

import { useTracked } from 'context';
import Api from 'api';

import FilterModal from './FilterModal';

const formatDate = date => moment(date).format('YYYY-MM-DD');
const updateReport = (res, dispatch) => dispatch({
    type: 'addNarratives',
    payload: res
});

export default function FilterModalContainer({visible, setVisible}) {
    const [store, dispatch] = useTracked();

    const [form] = Form.useForm();
    const onCreate = values => {
        setVisible(false);
        const {startDate, endDate} = values;
        if (startDate) values.startDate = formatDate(startDate);        
        if(endDate) values.endDate = formatDate(endDate);
        // Api call
        const param = `
            programme=${values.programme}&
            group=${values.group}&
            region=${values.region}&
            from=${values.startDate}&
            to=${values.endDate}
        `;
        Api.narrative.get(param.replace(/\s/g,''))
        .then(res => {
            updateReport(res, dispatch);
            form.resetFields();
        });
    };
    const onOk = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(err => console.log('Validate Failed:', err));
    };

    // startDate validation rule
    const defaultRule = {
        required: false,
        message: 'start date is required'
    };
    const [dateRule, setDateRule] = useState(defaultRule);
    // endDate validator
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