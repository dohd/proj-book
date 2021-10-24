import React, { useState } from 'react';
import { Form } from 'antd';

import Api from 'api';
import createPdf, { table } from 'utils/pdfMake'; 

import Response from './Response';

export default function ResponseContainer(props) {
    const {responseState, setResponseState, fetchNarratives} = props;

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
        const data = table.data(cells, colCount);

        let header1 = table.header(['Question', 'Task Response']);
        for (let i = 2; i < colCount; i++) {
            header1 = header1.concat(['']);
        }
        // add rowSpan and colSpan to index 0 and 1 objects
        header1.splice(0, 1, {...header1[0], rowSpan: 2});
        header1.splice(1, 1, {...header1[1], colSpan: columns.length});

        const colHeader = columns.map(({title}) => title);
        const header2 = table.header(colHeader);
        header2.splice(0, 0, '');

        const body = table.body(header1, header2, ...data);
        const content = [{text: 'Case Study', style: 'subheader'}, { ul: [caseStudy] }];
        createPdf('Narrative Report', body, void 0, 'landscape', 2, void 0, void 0, content);
    };

    // modal logic
    const [visible, setVisible] = useState(false);
    const onCreate = values => {
        setVisible(false);
        const reportKey = responseState['record']['key'];
        // api call
        Api.caseStudy.patch(reportKey, values)
        .then(res => fetchNarratives())
    };

    const [form] = Form.useForm();
    const onOk = () => {
        form.validateFields()
        .then(values => onCreate(values))
        .catch(console.log);
    };

    const params = {
        toggleReportView, dataSource,
        columns, caseStudy, onExport,
        visible, setVisible, onOk, form,
    };
    return <Response {...params} />;
}
