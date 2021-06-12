import React, { useState, useEffect } from 'react';

import EventPlanModal from './EventPlanModal';
import createPdf, { table } from 'utils/pdfMake';

export default function EventPlanModalContainer(props) {
    const {
        activityPlans, setVisible, participants,
        eventDate, ...rest
    } = props;

    const onCancel = () => setVisible(false);
    const onOk = () => setVisible(false);

    const [plans, setPlans] = useState([]);
    useEffect(() => {
        const list = activityPlans.map(obj => {
            const plan = { 
                key: obj.id,
                activityId: obj.activity.id,
                activity: obj.activity.action,
                programme: obj.planProgramme.keyProgramme.programme,
            };

            const regions = new Set();
            obj.planEvents.forEach(({planRegions}) => {
                planRegions.forEach(({region}) => {
                    regions.add(region.area);
                });
            });

            const groups = new Set();
            obj.planGroups.forEach(({targetGroup}) => {
                groups.add(targetGroup.group);
            });

            let status = '';
            for (const p of participants) {
                if (p.activityId === plan.activityId) {
                    status = 'Executed';
                    break;
                }
            }

            plan.regions = [...regions];
            plan.groups = [...groups];
            plan.materials = obj.planMaterial.material;
            plan.status = status;
            return plan;
        });
        setPlans(list);
    }, [activityPlans, participants]);

    const onExport = () => {
        const cells = [];
        plans.forEach(({key, activityId, ...rest}) => {
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
        createPdf(title, body, {margin: 5}, 'landscape');
    };
    
    const params = {
        plans, onOk, onCancel, 
        onExport, eventDate, ...rest
    };
    return <EventPlanModal {...params} />;
}