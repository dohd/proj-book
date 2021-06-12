import React, { useState, useEffect } from 'react';

import Donor from './Donor';
import Api from 'api';
import { useTracked } from 'context';
import { clientSocket } from 'utils';
import createPdf, { table } from 'utils/pdfMake'; 

const fetchDonors = dispatch => {
    Api.donor.get()
    .then(res => {
        dispatch({
            type: 'addDonors',
            payload: res
        });
        clientSocket.emit('donors', res);
    });
};

export default function Donors() {
    const [store, dispatch] = useTracked();
    const [state, setState] = useState({ 
        donors: [], record: {}
    });
    
    useEffect(() => {
        const list = store.donors.map(v => ({
            key: v.id,
            name: v.name,
            phone: v.phone,
            email: v.email
        }));
        setState(prev => ({...prev, donors: list}));
    }, [store.donors]);

    const onDelete = key => {
        Api.donor.delete(key)
        .then(res => fetchDonors(dispatch));
    };

    // modal logic
    const [visible, setVisible] = useState({ create: false, update: false });
    const showModal = () => setVisible(prev => ({...prev, create: true}));
    const showUpdateModal = record => {
        setState(prev => ({...prev, record}));
        setVisible(prev => ({...prev, update: true}));
    };

    const onExport = () => {
        const cells = [];
        state.donors.forEach(({key, ...rest}) => {
            for (const key in rest) cells.push({text: rest[key]});
        });
        const data = table.data(cells, 3);
        const header = table.header(['Name', 'Phone', 'Email']);
        const body = table.body(header, ...data);
        createPdf('Donors', body, {margin: 5});
    };

    const props = {
        visible, setVisible, state, onExport,
        showModal, showUpdateModal, onDelete,        
        fetchDonors: () => fetchDonors(dispatch)
    };
    return <Donor {...props} />;
}