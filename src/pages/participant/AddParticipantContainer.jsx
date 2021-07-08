import React, { useState, useEffect } from 'react';
import { Form, message } from 'antd';
import { useParams } from 'react-router';

import AddParticipant, { dateFormat } from './AddParticipant';
import Api from 'api';
import { useTracked } from 'context';
import fetchParticipants from './participantApi';

export default function AddParticipantContainer() {
    const { activityPlanId, activityId } = useParams();
    const [store, dispatch] = useTracked();

    const [state, setState] = useState({
        keyProgramme: {}, regions: []
    });

    const { activityPlans } = store;
    useEffect(() => {
        for(const p of activityPlans) {
            if (p.id === parseInt(activityPlanId)) {
                const keyProgramme = p.planProgramme.keyProgramme;
                let regions = [];
                p.planEvents.forEach(event => {
                    event.planRegions.forEach(v => {
                        regions.push(v.region);
                    });
                });
                // Unique region areas
                const regionObj = regions.reduce((r, c) => {
                    const key = '_' + c.area;
                    if (!r[key]) r[key] = c;
                    return r;
                }, {});

                regions = Object.values(regionObj);
                setState({ keyProgramme, regions});
                break;
            }
        }
    }, [activityPlans, activityPlanId]);

    const [form] = Form.useForm();
    const onFinish = values => {
        const { activityDate, name } = values;
        values.activityDate = activityDate.format(dateFormat);
        values.activityId = activityId;
        values.keyProgrammeId = state.keyProgramme.id;
        values.activityPlanId = activityPlanId;

        const [fName, lName] = name.split(' ');
        values.fName = fName;
        values.lName = lName;
        delete values.name;
        delete values.keyProgramme;

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
