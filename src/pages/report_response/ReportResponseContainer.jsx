import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router';

import ReportResponse from './ReportResponse';
import { useTracked } from 'context';
import Api from 'api';
import { clientSocket } from 'utils';

const fetchNarratives = dispatch => {
    Api.narrative.get()
    .then(res => {
        dispatch({
            type: 'addNarratives',
            payload: res
        });
        clientSocket.emit('narratives', res);
    });
};

export default function ReportResponseContainer() {
    const narrativeReportId = useParams()['narrativeReportId'];
    const [store, dispatch] = useTracked();

    const report = useMemo(() => {        
        const obj = {};
        for (const v of store.narratives) {
            for (const n of v.narratives) {
                if (n.key === parseInt(narrativeReportId)) {
                    const quizMap = n.responses.reduce((r,c) => {
                        const key = c.narrativeQuiz.key;
                        const quiz = c.narrativeQuiz.query;
                        if (!r[key]) r[key] = { key, quiz };
                        return r;    
                    }, {});
    
                    obj.quiz = Object.values(quizMap);
                    obj.responses = n.responses.map(v => ({ 
                        key: v.key,  
                        task: v.agenda.task, 
                        response: v.response,
                        quizId: v.narrativeQuiz.key
                    }));
                    break;
                }
            }
        }
        return obj;
    }, [store.narratives, narrativeReportId]);

    const onDelete = key => {
        Api.narrativeResponse.delete(key)
        .then(res => fetchNarratives(dispatch));
    };

    // modal logic
    const [record, setRecord] = useState({});
    const [visible, setVisible] = useState(false);
    const showModal = record => {
        setRecord(record);
        setVisible(true);
    };

    const props = {
        visible, setVisible, record, 
        onDelete, showModal, 
        state: report,
        fetchNarratives: () => fetchNarratives(dispatch)
    }
    return <ReportResponse {...props} />
}
