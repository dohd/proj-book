import Api from 'api';
import { clientSocket } from 'utils';

export default async function fetchParticipants(dispatch)
{
    const participants = await Api.participant.get();
    dispatch({type: 'addParticipants', payload: participants});

    const participantAnalysis = await Api.participantAnalysis.get();
    const regionGraph = await Api.regionGraph.get();
    const programmeGraph = await Api.programmeGraph.get();
    const activityCount = await Api.activityCount.get();
    const pendingReport = await Api.pendingReport.get();

    const eventsMap = {
        participants, participantAnalysis, regionGraph, 
        programmeGraph, activityCount, pendingReport
    };
    for (const event in eventsMap) {
        clientSocket.emit(event, eventsMap[event]);
    }
};
