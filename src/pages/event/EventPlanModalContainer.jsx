import React, { useState, useEffect } from 'react';

import EventPlanModal from './EventPlanModal';
import createPdf, { table } from 'utils/pdfMake';

export default function EventPlanModalContainer(props) {
    const {
        activityPlans, setVisible, participants,
        eventDate, ...rest
    } = props;

    const [plans, setPlans] = useState([]);
    useEffect(() => {
        if (activityPlans.length) {
            const plans = activityPlans.map(obj => ({
                key: obj.id,
                activity: obj.action,
                programme: obj.programme,
                region: obj.region.join(', '),
                group: obj.group.join(', '),
                material: obj.material,
                status: obj.status
            }));
            setPlans(plans);
        }
    }, [activityPlans]);

    const onCancel = () => setVisible(false);
    const onOk = () => setVisible(false);

    const onExport = () => {
        const cells = [];
        plans.forEach(({key, ...rest}) => {
            for (const key in rest) {
                const v = rest[key];
                if (Array.isArray(v)) cells.push({text: v.join(', ')});
                else cells.push({text: v});
            };
        });
        const data = table.data(cells, 6);
        const header = table.header([
            'Activity', 'Programme', 'Regions', 
            'Groups', 'Materials', 'Status'
        ]);
        const body = table.body(header, ...data);
        const title = `Activity Plan: ${eventDate}`;
        createPdf(title, body, void 0,'landscape');
    };
    
    const params = {
        plans, onOk, onCancel, 
        onExport, eventDate, ...rest
    };
    return <EventPlanModal {...params} />;
}