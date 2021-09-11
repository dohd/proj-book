import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { useParams } from 'react-router';

import ActivityPlans from './ActivityPlans';
import AddPlanModal from './AddPlanModal';
import Api from 'api';
import { useTracked } from 'context';
import { clientSocket } from 'utils';

const fetchActivityPlans = async dispatch => {
    const plans = await Api.activityPlan.get();
    dispatch({type: "addActivityPlans", payload: plans});

    const schedule = await Api.activitySchedule.get();
    const ptcpants = await Api.pendingParticipant.get();
    const eventplans = await Api.eventPlan.get();
    
    clientSocket.emit('activityPlans', plans);
    clientSocket.emit('activitySchedule', schedule);
    clientSocket.emit('pendingParticipants', ptcpants);
    clientSocket.emit('eventPlans', eventplans);
};

export default function ActivityPlansContainer() {
    const [store, dispatch] = useTracked();
    const activityId = useParams()['activityId'];

    const [activityPlans, setActivityPlans] = useState([]);
    useEffect(() => {
        const plans = store.activityPlans.filter(v => {
            if (v.activityId === parseInt(activityId)) {
                v.key = v.id;
                return true;
            }
            return false;
        });
        setActivityPlans(plans);
    }, [store.activityPlans, activityId]);

    // Modal logic
    const [visible, setVisible] = useState(false);
    const [state, setState] = useState({ 
        events: [ [],[] ] 
    });

    const [form] = Form.useForm();
    const onCreate = values => {
        setVisible(false);
        values.events = state.events[0].map((val, i) => ({
            date: val, regions: [...state.events[1][i]]
        }));
        values.activityId = activityId;
        values.programmeId = values.programme;
        delete values.programme;

        Api.activityPlan.post(values)
        .then(res => {
            if (!res) return;
            form.resetFields();
            fetchActivityPlans(dispatch);
        });
    };

    const onOk = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(err => console.log('Validation failed:',err))
    };

    const { keyProgrammes, targetGroups, targetRegions } = store;
    const modalProps = { 
        visible, setVisible, state, setState, 
        form, onOk, keyProgrammes, targetGroups,
        targetRegions
    };
    const planProps = { setVisible, activityPlans };
    return (
        <>
            <AddPlanModal {...modalProps} />
            <ActivityPlans {...planProps} />
        </>
    );
}
