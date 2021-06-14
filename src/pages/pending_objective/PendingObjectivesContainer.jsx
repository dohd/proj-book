import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import PendingObjectives from './PendingObjectives';
import Api from 'api';
import { Path } from 'routes';
import { useTracked } from 'context';
import { clientSocket, parseUrl } from 'utils';
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

export default function PendingObjectivesContainer() {
    const [store, dispatch] = useTracked();
    const [state, setState] = useState({ 
        objectives: [], record: {}
    });
    
    const { proposalId } = useParams();
    useEffect(() => {
        let objectives = [];
        for (const proposal of store.proposals) {
            if (proposal.id === parseInt(proposalId)) {
                objectives = proposal.objectives.map(val => ({
                    key: val.id, 
                    objective: val.objective,
                    updatedAt: new Date(val.updatedAt)
                }))
                .sort((a, b) => b.updatedAt - a.updatedAt );
                break;
            }
        }
        setState(prev => ({...prev, objectives}));
    }, [store.proposals, proposalId]);

    const onDelete = key => {
        Api.objective.delete(key)
        .then(res => fetchProposals(dispatch));          
    };

    const pendingAct = key => {
        sessionStorage.setItem('activityState', 'pending');
        const params = { objectiveId: key, proposalId };
        return parseUrl(Path.activities, params);
    };

    const onExport = () => {
        const cells = state.objectives.map(v => ({text: v.objective}));
        const data = table.data(cells, 1);
        const header = table.header(['Objective']);
        const body = table.body(header, ...data);
        createPdf('Pending Proposal Objective', body);
    };
    
    // Modal logic
    const [visible, setVisible] = useState({ add: false, edit: false });
    const showEditModal = record => {
        setState(prev => ({...prev, record}));
        setVisible({edit: true, add: false});
    };
    const showAddModal = () => setVisible({add: true, edit: false});

    const props = { 
        visible, setVisible, onExport, 
        state, showAddModal, onDelete,
        pendingAct, showEditModal,
        fetchProposals: () => fetchProposals(dispatch)
    };
    return <PendingObjectives {...props} />;
}