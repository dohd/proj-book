import React, { useState } from 'react';

import ActivityReport from './ActivityReport';
import { useTracked } from 'context';

export default function ActivityReportContainer() {
    const store = useTracked()[0];

    // modal logic
    const [record, setRecord] = useState([]);
    const [visible, setVisible] = useState({
        response: false, image: false
    });
    const showResponseModal = narratives => {
        setVisible(prev => ({...prev, response: true}));
        setRecord(narratives);
    };
    const showImageModal = narratives => {
        setVisible(prev => ({...prev, image: true}));
        setRecord(narratives);
    };

    const props = {
        visible, setVisible, record, 
        showResponseModal, showImageModal,
        activities: store.narratives
    };
    return <ActivityReport {...props} />;
}