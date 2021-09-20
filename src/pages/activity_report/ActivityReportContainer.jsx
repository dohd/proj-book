import React, { useState } from 'react';

import { useTracked } from 'context';

import ActivityReport from './ActivityReport';
import ResponseContainer from './ResponseContainer';
import ReportImageContainer from './ReportImageContainer';

export default function ActivityReportContainer() {
    const store = useTracked()[0];

    const [respState, setRespState] = useState({
        visible: false, record: {}
    });
    const [imageState, setImageState] = useState({
        visible: false, record: {}
    });

    // modal logic
    const [record, setRecord] = useState([]);
    const [reportVisible, setReportVisible] = useState(false);
    const [filterVisible, setFilterVisible] = useState(false);

    const showFilterModal = () => setFilterVisible(true);
    const showReportModal = report => {
        setReportVisible(true);
        setRecord(report);
    };

    const activityProps = {
        reportVisible, setReportVisible, record, 
        showReportModal, showFilterModal,
        filterVisible, setFilterVisible,
        setRespState, setImageState,
        activities: store.narratives
    };
    const responseProps = {respState, setRespState};
    const imageProps = {imageState, setImageState};

    return (
        respState.visible ? 
        <ResponseContainer {...responseProps} /> :
        imageState.visible ? 
        <ReportImageContainer {...imageProps} /> :    
        <ActivityReport {...activityProps} />
    );
}
