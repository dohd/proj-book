import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

import { reducer } from './reducer';

const initialState = {
    pendingPlans: [],
    pendingParticipants: [],
    pendingReports: [],
    activitySchedule: [],
    activityCount: {},
    regionGraph: {},
    programmeGraph: {},
    participantAnalysis: [],
    profileImage: {},
    eventImages: [],
    orgProfile: {},
    targetGroups: [],
    targetRegions: [],
    keyProgrammes: [],
    donors: [],
    donorContacts: [],
    participants: [],
    proposals: [],
    agenda: [],
    activityPlans: [],
    eventPlans: [],
    quiz: [],
    narratives: [],
    caseStudies: [],
    users: [],
    roles: [],
};

export const isValidType = payload => {
    const isArray = Array.isArray(payload);
    const isObject = typeof payload === 'object';
    return isArray || isObject;
};

const container = createContainer(() => useReducer(reducer, initialState));
export const { Provider, useTracked } = container;
