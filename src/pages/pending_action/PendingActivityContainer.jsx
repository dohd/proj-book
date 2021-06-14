import React, { useState, useEffect } from 'react';

import PendingActivity from './PendingActivity';
import { useTracked } from 'context';

export default function PendingActivityContainer() {
    // set approved page state 
    useEffect(() => {
        sessionStorage.setItem('objectiveState', 'approved');
        sessionStorage.setItem('activityState', 'approved');    
    }, []);

    const store = useTracked()[0];
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const activityPlans = store.pendingPlans.map(v => ({
            ...v, key: v.id, activity: v.action
        }));
        setActivities(activityPlans);
    }, [store.pendingPlans]);

    const props = { activities };
    return <PendingActivity {...props} />;
}
