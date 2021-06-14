import React, { useEffect, useState } from 'react';

import ActivityPlans from './PlanParticipant';
import { useTracked } from 'context';
import Api from 'api';
import { clientSocket } from 'utils';

const fetchPlans = async dispatch => {
    const plans = await Api.activityPlan.get();
    dispatch({type: 'addActivityPlans', payload: plans});

    const schedule = await Api.activitySchedule.get();
    const ptcpants = await Api.pendingParticipant.get();
    clientSocket.emit('activityPlans', plans);
    clientSocket.emit('activitySchedule', schedule);
    clientSocket.emit('pendingParticipants', ptcpants);
};

export default function PlanParticipantContainer() {
    // set approved page state 
    useEffect(() => {
        sessionStorage.setItem('objectiveState', 'approved');
        sessionStorage.setItem('activityState', 'approved');    
    }, []);

    const [store, dispatch] = useTracked();

    const [activityPlans, setActivityPlans] = useState([]);
    useEffect(() => {
        const plans = store.pendingParticipants.map(v => ({
            ...v, key: v.id, plan: v.title
        }));
        setActivityPlans(plans);
    }, [store.pendingParticipants]);

    const onDelete = key => {
        Api.activityPlan.delete(key)
        .then(res => fetchPlans(dispatch));
    };

    const props = { activityPlans, onDelete };
    return <ActivityPlans {...props} />; 
}
