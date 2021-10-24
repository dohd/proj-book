import React from 'react';

import createPdf, { table } from 'utils/pdfMake'; 

import Response from './Response';

export default function ResponseContainer(props) {
    const {responseState, setResponseState} = props;

    const toggleReportView = () => {
        setResponseState(prev => ({
            ...prev, visible: false
        }));
        sessionStorage.removeItem('reportKey');
    };

    /**
     * Report Record object 
     * 
     * @var array query 
     * @var array response 
     * @var array task 
     * @var number response_id 
     */
    const {query, response, task, response_id} = responseState?.record.response[0];
    // case study
    const caseStudy = responseState?.record.case_study;

    // Questions to response map
    const queryObj = query.reduce((acc, curr, i) => {
        const setProp = acc[curr];
        if (!setProp) {
            acc[curr] = {
                key: i,
                query: curr,
                [task[i]]:response[i],
                response_id: response_id[i],
            };
        } else {
            acc[curr] = {
                ...setProp,
                [task[i]]:response[i],
                response_id: response_id[i]
            }; 
        }               
        return acc;
    }, {});

    // Response rows
    const dataSource = Object.values(queryObj);

    // task columns
    const columns = [...new Set(task)].map((v, i) => ({
        title: v, 
        key: i, 
        dataIndex: v,
    }));

    // on export to pdf
    const onExport = () => {
        const cells = [];
        dataSource.forEach(v => {
            const {response_id, key, query, ...rest} = v;
            const keys = Object.keys(rest); 
            const headers = columns.map(({title}) => title); 

            cells.push({text: query});
            headers.forEach(val => {
                if (keys.includes(val)) {
                    return cells.push({text: rest[val]});
                }
                cells.push({text: ''});         
            });
        });

        const colCount = columns.length + 1;
        const colHeader = columns.map(({title}) => title);

        const data = table.data(cells, colCount);

        const header1 = table.header(['Question', 'Task Response']);
        const header2 = table.header(colHeader);
        // add rowSpan attribute
        header1.splice(0, 1, {...header1[0], rowSpan: 2});
        // add an empty string
        header2.splice(0, 0, '');

        const body = table.body(header1, header2, ...data);
        const content = [{text: 'Case Study', style: 'subheader'}, { ul: [caseStudy] }];
        createPdf('Narrative Report', body, void 0, 'landscape', 2, void 0, void 0, content);
    };

    const params = {
        toggleReportView, dataSource,
        columns, caseStudy, onExport
    };
    return <Response {...params} />;
}
