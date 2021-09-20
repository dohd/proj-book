import React, { useState } from 'react';
import { message } from 'antd';

import { useTracked } from 'context';
import Api, { fetchAud } from 'api';
import { clientSocket } from 'utils';
import uploadTask from 'utils/firebaseConfig';

import ReportImage from './ReportImage';

const fetchNarratives = dispatch => {
    Api.narrative.get()
    .then(res => {
        dispatch({type: 'addNarratives', payload: res});
        clientSocket.emit('narratives', res);
    });
};

export default function ReportImageContainer(props) {
    const {imageState, setImageState} = props;
    const {record} = imageState;
    
    const narrativeReportId = record?.key;
    const imageData = record?.image || [];

    const dispatch = useTracked()[1];
    const [loading, setLoading] = useState(false);

    const upload = async file => {
        const url = await uploadTask(`/events/${file.name}`, file);
        const values = { narrativeReportId, url };
        const res = await Api.eventImage.post(values);
        if (res) fetchNarratives(dispatch);
        setLoading(false);    
    };

    const handleBeforeUpload = file => {
        const name = `${fetchAud()}-${narrativeReportId}-${file.name}`;
        const renFile = new File([file], name, {type: file.type});
        setLoading(true);

        upload(renFile).catch(err => {
            console.log(err);
            setLoading(false);
            message.error(
                `Something went wrong! 
                Choose a different image.`
            );
        });
        return false;
    };

    const toggleReportView = () => setImageState(prev => ({
        ...prev, visible: false
    }));

    const imageProps = { 
        handleBeforeUpload, loading, imageData,
        toggleReportView
    };
    return <ReportImage {...imageProps} />;
}