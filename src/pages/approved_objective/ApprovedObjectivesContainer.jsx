import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ApprovedObjectives from './ApprovedObjectives';
import { Path } from 'routes';
import { useTracked } from 'context';
import { parseUrl } from 'utils';
import createPdf, { table } from 'utils/pdfMake';

export default function ApprovedObjectivesContainer() {
    const store = useTracked()[0];
    const [objectives, setObjectives] = useState([]);

    const { proposalId } = useParams();
    useEffect(() => {
        let objectives = [];
        for (const proposal of store.proposals) {
            if (proposal.id === parseInt(proposalId)) {
                objectives = proposal.objectives.map(v => ({
                    key: v.id, 
                    objective: v.objective,
                    updatedAt: new Date(v.updatedAt)
                }))
                .sort((a,b) => b.updatedAt - a.updatedAt);
                break;
            }
        }
        setObjectives(objectives);
    }, [store.proposals, proposalId]);

    const approvedAct = key => {
        sessionStorage.setItem('activityState', 'approved');
        const params = { objectiveId: key, proposalId };
        return parseUrl(Path.activities, params);
    };

    const onExport = () => {
        const cells = objectives.map(v => ({text: v.objective}));
        const data = table.data(cells, 1);
        const header = table.header(['Objective']);
        const body = table.body(header, ...data);
        createPdf('Approved Proposal Objectives', body);
    };

    const props = { objectives, approvedAct, onExport };
    return <ApprovedObjectives {...props} />;
}