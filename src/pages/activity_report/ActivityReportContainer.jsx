import React, { useEffect, useState } from 'react';

import { useTracked } from 'context';
import Api from 'api';
import { clientSocket } from 'utils';

import ActivityReport from './ActivityReport';
import ResponseContainer from './ResponseContainer';
import ReportImageContainer from './ReportImageContainer';

const fetchNarratives = async dispatch => {
    const narratives = await Api.narrative.get()
    dispatch({type: 'addNarratives', payload: narratives});
    clientSocket.emit('narratives', narratives);
}

export default function ActivityReportContainer() {
    const [store, dispatch] = useTracked();
    const {narratives: activities} = store;

    const [responseState, setResponseState] = useState({
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
    const showReportModal = record => {
        setReportVisible(true);

        const {report} = record;
        setRecord(report);
    };

    // on report delete 
    const onDelete = key => {
        Api.narrative.delete(key)
        .then(res => fetchNarratives(dispatch));
    };

    // persist state on page reload
    // should be implemented through the global state
    // but only working using the back button on Response and 
    // ReportImage page
    useEffect(() => {
        const storeReportKey = sessionStorage['reportKey'];
        const imageState = sessionStorage['imageState'];

        if (storeReportKey) {
            activityLoop:
            for (const activity of activities) {
                const {report: reportList} = activity;
                for (const report of reportList) {
                    if (report.key === Number(storeReportKey)) {
                        if (imageState) {
                            setImageState({visible: true, record: report})
                        } else {
                            setResponseState({visible: true, record: report});
                        }
                        break activityLoop;                        
                    }
                }
            }
        }
    }, [activities]);

    const activityProps = {
        reportVisible, setReportVisible, record, showReportModal, 
        showFilterModal, filterVisible, setFilterVisible,
        setResponseState, setImageState, onDelete,
        activities
    };
    const responseProps = {responseState, setResponseState};
    const imageProps = {imageState, setImageState};

    return (
        responseState.visible ? <ResponseContainer {...responseProps} /> :
        imageState.visible ? <ReportImageContainer {...imageProps} /> :    
        <ActivityReport {...activityProps} />
    );
}
