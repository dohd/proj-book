import React from 'react';
import { PlanActivities } from '../../pages/implementation_plan';
import { ApprovedObjectives } from '../../pages/approved_objective';
import { PendingObjectives } from '../../pages/pending_objective';
import { PendingActivities } from '../../pages/pending_activity';

export function Objectives(props) {
    const state = sessionStorage.getItem('objectiveState');
    return (
        state === 'approved' ? 
        <ApprovedObjectives {...props} /> : 
        <PendingObjectives {...props} />
    );
}

export function Activities(props) {
    const state = sessionStorage.getItem('activityState');
    return (
        state === 'approved' ?
        <PlanActivities {...props} /> :
        <PendingActivities {...props} />
    );
}