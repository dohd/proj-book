import React, { useState } from 'react';

import ActivityReport from './ActivityReport';
import { useTracked } from 'context';

export default function ActivityReportContainer() {
    const store = useTracked()[0];

    // modal logic
    const [record, setRecord] = useState([]);
    const [visible, setVisible] = useState(false);

    const showModal = narratives => {
        setVisible(true);
        setRecord(narratives);
    };

    const props = {
        visible, setVisible, record, 
        showModal,
        activities: store.narratives
    };
    return <ActivityReport {...props} />;
}