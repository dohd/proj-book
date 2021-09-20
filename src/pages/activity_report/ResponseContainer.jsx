import React from 'react';

import Response from './Response';

export default function ResponseContainer(props) {
    const {respState, setRespState} = props;

    const toggleReportView = () => setRespState(prev => ({
        ...prev, visible: false
    }));

    const record = respState?.record;
    const {query, response, task, response_id} = record.response[0];

    // task columns
    const taskCol = [...new Set(task)].map((v,i) => ({
        title: v, key: i, dataIndex: v 
    }));
    // response rows
    const queryObj = query.reduce((r,c,i) => {
        if (!r[c]) {
            r[c] = {
                key: i,
                query: c,
                [task[i]]:response[i],
                [`${task[i]}_id`]: response_id[i]
            };
        } else {
            const prev = r[c];
            r[c] = {
                ...prev,
                [task[i]]:response[i],
                [`${task[i]}_id`]: response_id[i]
            };
        }
        return r;
    }, {});
    const rowData = Object.values(queryObj);

    const params = {
        toggleReportView, taskCol, rowData, 
        case_study: record.case_study
    };
    return <Response {...params} />;
}