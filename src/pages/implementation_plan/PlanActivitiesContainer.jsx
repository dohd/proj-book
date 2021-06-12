import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PlanActivities from './PlanActivities';
import { useTracked } from 'context';
import Api from 'api';
import { clientSocket } from 'utils';
import createPdf, { table } from 'utils/pdfMake'; 

const fetchProposals = dispatch => {
    Api.proposal.get()
    .then(res => {
        dispatch({
            type: 'addProposals',
            payload: res
        });
        clientSocket.emit('proposals', res);
    });
}

export default function PlanActivitiesContainer() {
    const [store, dispatch] = useTracked();
    const [activities, setActivities] = useState([]);

    const { objectiveId } = useParams();
    useEffect(() => {
        let activities = [];
        proposal_loop: 
        for(const proposal of store.proposals) {
            for (const obj of proposal.objectives) {
                if (obj.id === Number(objectiveId)) {
                    activities = obj.activities.map(v => ({
                        key: v.id, 
                        activity: v.action,
                        updatedAt: new Date(v.updatedAt)
                    }))
                    .sort((a,b) => b.updatedAt - a.updatedAt);
                    break proposal_loop;
                }
            }
        }
        setActivities(activities);
    }, [store.proposals, objectiveId]);

    const onExport = () => {
        const cells = activities.map(v => ({text: v.activity}));
        const data = table.data(cells, 1);
        const header = table.header(['Activity']);
        const body = table.body(header, ...data);
        createPdf('Implementaion Plan', body, {margin: 5});
    };

    // Modal logic
    const [visible, setVisible] = useState(false);
    const showModal = () => setVisible(true); 
    
    const props = {
        activities, visible, setVisible, 
        showModal, onExport, 
        fetchProposals: () => fetchProposals(dispatch)
    };
    return <PlanActivities {...props} />;
}