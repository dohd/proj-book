import React, { useState, useEffect } from 'react';

import PendingActivities from './PendingActivities';
import Api from 'api';
import { useParams } from 'react-router-dom';
import { useTracked } from 'context';
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
};

export default function PendingActivitesContainer() {
    const [store, dispatch] = useTracked();
    const [state, setState] = useState({ 
        activities: [], record: {}
    });

    const { objectiveId } = useParams();
    useEffect(() => {
        let activities = [];
        proposal_loop: 
        for(const proposal of store.proposals) {
            for (const obj of proposal.objectives) {
                if (obj.id === parseInt(objectiveId)) {
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
        setState(prev => ({...prev, activities}));
    }, [store.proposals, objectiveId]);

    const onDelete = key => {
        Api.activity.delete(key)
        .then(res => fetchProposals(dispatch));             
    };

    const onExport = () => {
        const cells = state.activities.map(v => ({text: v.activity}));
        const data = table.data(cells, 1);
        const header = table.header(['Activity']);
        const body = table.body(header, ...data);
        createPdf('Pending Proposal Activities', body);
    };

    // Modal logic
    const [visible, setVisible] = useState({ add: false, edit: false});
    const showEditModal = record => { 
        setState(prev => ({...prev, record}));
        setVisible(prev => ({...prev, edit: true}));
    };
    const showAddModal = () => setVisible(prev => ({...prev, add: true}));
    
    const props = { 
        state, visible, setVisible, onExport, 
        showAddModal, onDelete, showEditModal,
        fetchProposals: () => fetchProposals(dispatch)
    };
    return <PendingActivities {...props} />;
}