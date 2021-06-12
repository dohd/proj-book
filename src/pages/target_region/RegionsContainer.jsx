import React, { useState, useEffect } from "react";

import Regions from "./Regions";
import Api from 'api';
import { useTracked } from "context";
import { clientSocket } from 'utils';
import createPdf, { table } from "utils/pdfMake";

const fetchTargetRegions = dispatch => {
    Api.targetRegion.get()
    .then(res => {
        dispatch({
            type: 'addTargetRegions',
            payload: res
        });
        clientSocket.emit('targetRegions', res);
    });
};

export default function RegionsContainer() {
    const [store, dispatch] = useTracked();
    const [state, setState] = useState({
        regions: [], record: {}
    });

    const { targetRegions } = store;
    useEffect(() => {
        const list = targetRegions.map(v => ({
            key: v.id, region: v.area
        }));
        setState(prev => ({...prev, regions: list})); 
    }, [targetRegions]);

    const onDelete = key => {
        Api.targetRegion.delete(key)
        .then(res => fetchTargetRegions(dispatch));
    };

    const onExport = () => {
        const cells = state.regions.map(v => ({text: v.region}));
        const data = table.data(cells, 1);
        const header = table.header(['Region']);
        const body = table.body(header, ...data);
        createPdf('Target Regions', body, {margin: [5, 5, 0, 5]});
    };

    // Modal logic
    const [visible, setVisible] = useState({ create: false, update: false });
    const showModal = () => setVisible(prev => ({...prev, create: true}));
    const showUpdateModal = record => {
        setState(prev => ({...prev, record}));
        setVisible(prev => ({...prev, update: true}));
    };

    const props = { 
        visible, setVisible, showModal, state,
        showUpdateModal, onDelete, onExport,
        fetchTargetRegions: () => fetchTargetRegions(dispatch)
    };
    return <Regions {...props} />;
}