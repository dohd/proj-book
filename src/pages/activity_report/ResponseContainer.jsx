import React from 'react';

import Response from './Response';

export default function ResponseContainer(props) {
    const {respState, setRespState} = props;

    const toggleReportView = () => setRespState(prev => ({
        ...prev, visible: false
    }));

    const record = respState?.record;
    const {query, response, task, response_id} = record.response[0];
    /**
     * Response object map
     * 
     * @var query object
     * @var response object
     * @var task object
     * @var response_id object
     */
    const queryObj = query.reduce((acc, curr, i) => {
        if (!acc[curr]) {
            acc[curr] = {
                key: i,
                query: curr,
                [task[i]]:response[i],
                [`${task[i]}_id`]: response_id[i],
            };
            return acc;
        }
        const val = acc[curr];
        acc[curr] = {
            ...val,
            [task[i]]:response[i],
            [`${task[i]}_id`]: response_id[i]
        };        
        return acc;
    }, {});
    // Response rows
    const rowData = Object.values(queryObj);

    // add editable property to task column objects
    const taskCols = [...new Set(task)].map((v, i) => ({
        title: v, 
        key: i, 
        dataIndex: v,
        editable: true,
    }));

    // add oncell function to editable column object
    const columns = taskCols.map((col) => {
        if (!col.editable) return col;
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
            }),
        };
    });

    const params = {
        toggleReportView, rowData, 
        case_study: record.case_study,
        taskCols: columns,
    };
    return <Response {...params} />;
}
