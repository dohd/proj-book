import React, { useEffect, useState } from 'react';

import CaseStudy from './CaseStudy';
import { useTracked } from 'context';
import Api from 'api';
import { useParams } from 'react-router';
import { clientSocket } from 'utils';
import createPdf, { table } from 'utils/pdfMake';

const fetchNarrative = async dispatch => {
    const res = await Api.narrative.get();
    dispatch({type: 'addNarratives', payload: res});
    clientSocket.emit('narratives', res);
};

export default function CaseStudyContainer() {
    const { activityId } = useParams();
    
    const [store, dispatch] = useTracked();
    const [caseStudies, setCaseStudies] = useState([]);

    useEffect(() => {
        const list = [];
        for (const study of store.caseStudies) {
            const { title, activity } = study.narrativeReport;
            if (activity.id === parseInt(activityId)) {
                list.push({ 
                    key: study.id, 
                    report: title,
                    caseStudy: study.case,
                });
            }
        }
        setCaseStudies(list);
    }, [store.caseStudies, activityId]);

    const onDelete = key => {
        Api.caseStudy.delete(key)
        .then(res => fetchNarrative(dispatch));
    };

    const onExport = () => {
        const cells = [];
        caseStudies.forEach(({key, ...rest}) => {
            for (const key in rest) cells.push({text: rest[key]});
        });
        const data = table.data(cells, 2);
        const header = table.header(['Report', 'Case study']);
        const body = table.body(header, ...data);
        createPdf('Case studies', body);
    };

    // modal logic
    const [record, setRecord] = useState({});
    const [visible, setVisible] = useState(false);

    const showModal = record => {
        setRecord(record);
        setVisible(true);
    };

    const props = { 
        caseStudies, record, visible, onExport, 
        setVisible, showModal, onDelete,
        fetchNarrative: () => fetchNarrative(dispatch)
    };
    return <CaseStudy {...props} />
}