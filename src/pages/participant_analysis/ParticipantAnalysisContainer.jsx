import React, { useEffect, useState } from 'react';

import ParticipantAnalysis from './ParticipantAnalysis';
import { useTracked } from 'context';
import createPdf, { table } from 'utils/pdfMake';

export default function ParticipantAnalysisContainer() {
    const store = useTracked()[0];
    const [analysis, setAnalysis] = useState([]);

    useEffect(() => {
        const analysis = store.participantAnalysis;
        const list = [];
        analysis.forEach(v => {
            const obj = {};
            obj.key = v.id;
            obj.title = v.activity.action;
            obj.date = v.planEvents.join(', ');
            obj.programme = v.planProgramme[0];
            obj.regions = v.planRegions.join(', ');
            obj.groups = v.planGroups.join(', ');
            obj.male = v.participants.male;
            obj.female = v.participants.female;
            obj.total = obj.male + obj.female;
            list.push(obj);
        });
        setAnalysis(list);
    }, [store.participantAnalysis]);

    const onExport = () => {
        const cells = [];
        analysis.forEach(({key, ...rest}) => {
            for (const key in rest) {
                cells.push({text: rest[key]});
            }
        });
        const data = table.data(cells, 8);
        let header1 = [
            { text: 'Activity', colSpan: 2, }, '',
            { text: 'Plan', colSpan: 3, }, '', '',
            { text: 'Gender', colSpan: 3, }, '', ''
        ]
        header1 = header1.map(v => {
            if (typeof v === 'string') return v;
            const obj = table.header()[0];
            return {...obj, ...v};
        });
        const header2 = table.header([
            'Title', 'Date', 'Programme', 'Regions',
            'Groups', 'Male', 'Female', 'Total'
        ]);
        const body = table.body(header1, header2, ...data);
        const fillColor = i => {
            if (i === 0 || i === 1) return '#0f4871';
            else if (i % 2 === 0) return '#f2f2f2';
        };
        createPdf(
            'Participant Analysis', body, {margin: [0, 5, 0, 5]},
            'landscape', 2, fillColor
        );
    };

    const props = { analysis, onExport };
    return <ParticipantAnalysis {...props} />;
}