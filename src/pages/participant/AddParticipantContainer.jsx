import React, { useState, useEffect } from 'react';
import { Form, message } from 'antd';
import { useParams } from 'react-router';

import Api from 'api';
import { useTracked } from 'context';
import fetchParticipants from './participantApi';

import AddParticipant, { dateFormat } from './AddParticipant';

export default function AddParticipantContainer() {
    const [store, dispatch] = useTracked();
    const { activityPlanId, activityId } = useParams();

    const { activityPlans } = store;
    const [state, setState] = useState({
        keyProgramme: {}, regions: []
    });

    useEffect(() => {
        for (const plan of activityPlans) {
            if (plan.key === Number(activityPlanId)) {
                const regions = Object.entries(plan.region).map(v => ({
                    id: v[0], area: v[1]
                }));
                setState(prev => ({...prev, regions}));
                break;
            }
        }
    }, [activityPlans, activityPlanId]);

    const [form] = Form.useForm();
    const onFinish = values => {
        const { activityDate, name } = values;
        values.activityDate = activityDate.format(dateFormat);
        values.activityId = activityId;
        values.activityPlanId = activityPlanId;
        values.keyProgrammeId = state.keyProgramme.id;
        values.fName = name.split(' ')[0];
        values.lName = name.split(' ')[1];
        // Api call
        Api.participant.post(values)
        .then(res => {
            if (!res) return;
            form.resetFields();
            message.success('Participant created successfully');
            fetchParticipants(dispatch);
        });
    };
    const onFinishFailed = err => console.log('Error:', err);

    useEffect(() => {
        const { programme } = state.keyProgramme;
        if (programme) form.setFieldsValue({ 
            keyProgramme: programme 
        });
    }, [state.keyProgramme, form]);

    const props = { form, onFinish, onFinishFailed, state };
    return <AddParticipant {...props} />;
}
