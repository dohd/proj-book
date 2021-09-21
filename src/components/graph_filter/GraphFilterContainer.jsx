import React from 'react';

import GraphFilter from './GraphFilter';
import Api from 'api';

export default function GraphFilterContainer(props) {
    const { apiKey, dispatch, actionType } = props;

    const onFinish = values => {
        if (!values.filter) {
            return Api[apiKey].get()
            .then(res => dispatch({
                type: actionType,
                payload: res
            }));
        }
        
        const dates = values.filter.map(v => v.format('YYYY-MM-DD'));
        const param = `from=${dates[0]}&to=${dates[1]}`;
        Api[apiKey].get(param)
        .then(res => dispatch({
            type: actionType,
            payload: res
        }));
    };
    const onFinishFailed = err => console.log('Error:', err);

    const params = { onFinish, onFinishFailed };
    return <GraphFilter {...params} />;
}
