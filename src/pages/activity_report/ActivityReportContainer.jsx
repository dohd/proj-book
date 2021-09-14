import React, { useState } from 'react';

import ActivityReport from './ActivityReport';
import { useTracked } from 'context';

export default function ActivityReportContainer() {
    const store = useTracked()[0];

    // modal logic
    const [record, setRecord] = useState([]);
    const [reportVisible, setReportVisible] = useState(false);
    const [filterVisible, setFilterVisible] = useState(false);

    const showFilterModal = () => setFilterVisible(true);
    const showReportModal = narratives => {
        setReportVisible(true);
        setRecord(narratives);
    };

    const props = {
        reportVisible, setReportVisible, record, 
        showReportModal, showFilterModal,
        filterVisible, setFilterVisible,
        activities: store.narratives
    };
    return <ActivityReport {...props} />;
}