import Path from './routes';

const RouteNameMap = {
    [Path.home]: 'Dashboard',
    [Path.proposals]: 'Proposals',
    [Path.createProposal]: 'Add Proposal',
    [Path.updateProposal]: 'Update Proposal',
    [Path.objectives]: 'Objectives',
    [Path.activities]: 'Activities',
    [Path.implement]: 'Pending Implementation Action',
    [Path.agenda]: 'Agenda',
    [Path.updatePendingAgenda]: 'Agenda',
    [Path.participants]: 'Participants',
    [Path.createParticipant]: 'Add',
    [Path.planParticipant]: 'Add Participant',
    [Path.implementParticipant]: 'Add Participant',
    [Path.updateParticipant]: 'Update Participant',
    [Path.narrativeReport]: 'Add Narrative Report',
    [Path.updatePendingReport]: 'Add Narrative Report',
    [Path.pendingReport]: 'Pending Report Activities',
    [Path.donors]: 'Donors',
    [Path.donorContacts]: 'Donor Contacts',
    [Path.eventCalendar]: 'Event Calendar',
    [Path.activityPlans]: 'Activity Plans',
    [Path.participantAnalysis]: 'Participant Analysis',
    [Path.regions]: 'Target Regions',
    [Path.programmes]: 'Key Programmes',
    [Path.groups]: 'Target Groups',
    [Path.responses]: 'Responses',
    [Path.activityPhoto]: 'Event Photos',
    [Path.users]: 'Users',
    [Path.settings]: 'Settings',
    [Path.graphs]: 'Data Visualization',
    
    [Path.activityReport]: 'Activity Report',
    [Path.reportView]: 'Report View',
    [Path.reportImages]: 'Images',
    [Path.pendingActivities]: 'Pending Activity Plans',
    [Path.pendingPlans]: 'Plan Participants',
    [Path.pendingActivityReport]: 'Pending Activity Reports'
};

export default RouteNameMap;