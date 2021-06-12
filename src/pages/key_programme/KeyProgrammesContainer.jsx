import React, { useState, useEffect } from "react";

import KeyProgrammes from './KeyProgrammes';
import Api from 'api';
import { useTracked } from "context";
import { clientSocket } from "utils";
import createPdf, { table } from 'utils/pdfMake';

const fetchKeyProgrammes = dispatch => {
    Api.keyProgramme.get()
    .then(res => {
        dispatch({
            type: 'addKeyProgrammes',
            payload: res
        });
        clientSocket.emit('keyProgrammes', res);
    });
};

export default function KeyProgrammesContainer() {
    const [store, dispatch] = useTracked();
    const [state, setState] = useState({
        programmes: [], record: {}
    });

    useEffect(() => {
        const list = store.keyProgrammes.map(v => ({
            key: v.id, programme: v.programme
        }));
        setState(prev => ({...prev, programmes: list}));
    }, [store.keyProgrammes]);

    const onDelete = key => {
        Api.keyProgramme.delete(key)
        .then(res => fetchKeyProgrammes(dispatch));
    };

    const onExport = () => {
        const cells = state.programmes.map(v => ({text: v.programme}));
        const data = table.data(cells, 1);
        const header = table.header(['Programme']);
        const body = table.body(header, ...data);
        createPdf('Key Programmes', body, {margin: [5, 5, 0, 5]});
    };

    // Modal logic
    const [visible, setVisible] = useState({ create: false, update: false });
    const showModal = () => setVisible(prev => ({...prev, create: true}));
    const showUpdateModal = record => {
        setState(prev => ({...prev, record}));
        setVisible(prev => ({...prev, update: true}));
    };

    const props = {
        state, visible, setVisible, onExport,
        showModal, showUpdateModal, onDelete,
        fetchKeyProgrammes: () => fetchKeyProgrammes(dispatch)
    };
    return <KeyProgrammes {...props} />;
}