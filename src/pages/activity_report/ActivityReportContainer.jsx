import React, { useState } from 'react';

import ActivityReport from './ActivityReport';
import { useTracked } from 'context';

export default function ActivityReportContainer() {
    const store = useTracked()[0];

    // modal logic
    const [record, setRecord] = useState([]);
    const [visible, setVisible] = useState(false);

    const showModal = narratives => {
    const showFilterModal = () => setFilterVisible(true);
    const showReportModal = narratives => {
        setReportVisible(true);
    };

    const props = {
        visible, setVisible, record, 
        reportVisible, setReportVisible, record, 
        showReportModal, showFilterModal,
        filterVisible, setFilterVisible,
    };
    return <ActivityReport {...props} />;
}