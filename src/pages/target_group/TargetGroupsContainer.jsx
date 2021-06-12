import React, { useState, useEffect } from "react";

import TargetGroups from './TargetGroups';
import Api from 'api';
import { useTracked } from "context";
import { clientSocket } from "utils";
import createPdf, { table } from "utils/pdfMake";

const fetchTargetGroups = dispatch => {
    Api.targetGroup.get()
    .then(res => {
        dispatch({
            type: 'addTargetGroups',
            payload: res
        });
        clientSocket.emit('targetGroups', res);
    });
}

export default function TargetGroupsContainer() {
    const [store, dispatch] = useTracked();
    const [state, setState] = useState({
        groups: [], record: {}
    });

    useEffect(() => {
        const groups = store.targetGroups.map(v => ({
            key: v.id, group: v.group
        }));
        setState(prev => ({...prev, groups }));
    }, [store.targetGroups]);

    const onDelete = key => {
        Api.targetGroup.delete(key)
        .then(res => fetchTargetGroups(dispatch));
    };

    const onExport = () => {
        const cells = state.groups.map(v => ({text: v.group}));
        const data = table.data(cells, 1);
        const header = table.header(['Group']);
        const body = table.body(header, ...data);
        createPdf('Target Groups', body, {margin: [5, 5, 0, 5]});
    };

    // modal logic
    const [visible, setVisible] = useState({ create: false, update: false });
    const showModal = () => setVisible(prev => ({...prev, create: true}));
    const showUpdateModal = record => {
        setState(prev => ({...prev, record}));
        setVisible(prev => ({...prev, update: true}));
    };

    const props = { 
        visible, setVisible, showUpdateModal, state, 
        onDelete, showModal, onExport,
        fetchTargetGroups: () => fetchTargetGroups(dispatch)
    };
    return <TargetGroups  {...props} />;
}