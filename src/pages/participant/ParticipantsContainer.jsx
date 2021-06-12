import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import Participants from './Participants';
import { fetchParticipants } from './participantApi';
import { useTracked } from 'context';
import Api from 'api';
import createPdf, { table } from 'utils/pdfMake';

export default function ParticipantsContainer() {
    const [store, dispatch] = useTracked();
    const { activityPlanId } = useParams();

    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const participants = [];
        store.participants.forEach(v => {
            if (v.activityPlanId === parseInt(activityPlanId)) {
                const obj = {};
                obj.key = v.id;
                obj.activityDate = v.activityDate;
                obj.name =  `${v.fName} ${v.lName}`;
                obj.gender = v.gender;
                obj.disability = v.detail.disability;
                obj.designation = v.detail.designation;
                obj.phone = v.detail.phone;
                obj.email = v.detail.email;
                obj.programme = v.keyProgramme.programme;
                obj.region = v.region.area;
                participants.push(obj);
            }
            return v;
        });
        setParticipants(participants);
    }, [store.participants, activityPlanId]);

    const onDelete = key => {
        Api.participant.delete(key)
        .then(res => fetchParticipants(dispatch));
    };

    const onExport = () => {
        const cells = [];
        participants.forEach(({key, ...rest}) => {
            for (const key in rest) cells.push({text: rest[key]});
        });
        const data = table.data(cells, 9);
        const header = table.header([
            'Activity Date', 'Name', 'Gender', 'Disability',
            'Designation', 'Phone', 'Email', 'Programme', 'Region'
        ]);
        const body = table.body(header, ...data);
        createPdf('Activity Participants', body, {margin: 5}, 'landscape');
    };

    const props = { participants, onDelete, onExport };
    return <Participants {...props} />;
}
