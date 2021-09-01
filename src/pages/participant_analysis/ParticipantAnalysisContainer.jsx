import React, { useEffect, useState } from 'react';

import ParticipantAnalysis from './ParticipantAnalysis';
import { useTracked } from 'context';
import createPdf, { table } from 'utils/pdfMake';

export default function ParticipantAnalysisContainer() {
    const store = useTracked()[0];
    const [analysis, setAnalysis] = useState([]);

    const {participantAnalysis} = store;
    useEffect(() => {
        if (participantAnalysis.length) {
            const analysis = participantAnalysis.map(v => ({
                key: v.id,
                action: v.action,
                activity_date: v.activity_date.join(', '),
                programme: v.programme.join(', '),
                area: v.area.join(', '),
                group: v.group.join(', '),
                male: v.male,
                female: v.female,
                total: v.total
            }));
            setAnalysis(analysis);
        }
    }, [participantAnalysis]);

    const onExport = () => {
        const cells = analysis.reduce((r, {key, ...rest}) => {
            for (const k in rest) {
                r.push({text: rest[k]});
            }
            return r;
        }, []);

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