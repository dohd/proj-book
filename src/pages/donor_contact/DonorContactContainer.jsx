import React, { useState, useEffect } from 'react';

import DonorContact from './DonorContact';
import Api from 'api';
import { useTracked } from 'context';
import { clientSocket } from 'utils';
import createPdf, { table } from 'utils/pdfMake';

const fetchDonorContacts = dispatch => {
    Api.donorContact.get()
    .then(res => {
        dispatch({
            type: 'addDonorContacts',
            payload: res
        });
        clientSocket.emit('donorContacts', res);
    });
};

export default function DonorContactContainer(params) {
    const [store, dispatch] = useTracked();
    const [state, setState] = useState({ 
        contacts: [], record: {}, donors: []
    });
    
    useEffect(() => {
        const contacts = store.donorContacts.map(v => ({
            key: v.id, 
            donor: v.donor.name,
            donorId: v.donor.id,
            contactName: `${v.fName} ${v.lName}`,
            telephone: v.telephone,
            email: v.email
        }));
        setState(prev => ({...prev, contacts, donors: store.donors}));
    }, [store.donorContacts, store.donors]);

    const onDelete = key => {
        Api.donorContact.delete(key)
        .then(res => fetchDonorContacts(dispatch));
    };

    const onExport = () => {
        const cells = [];
        state.contacts.forEach(({key, ...rest}) => {
            for (const key in rest) cells.push({text: rest[key]});
        });
        const data = table.data(cells, 4);
        const header = table.header([
            'Donor', 'Contact Name', 'Telephone', 'Email'
        ]);
        const body = table.body(header, ...data);
        createPdf('Donor Contacts', body);
    };

    // modal logic
    const [visible, setVisible] = useState({ create: false, update: false });
    const showModal = () => setVisible(prev => ({...prev, create: true}));
    const showUpdateModal = record => {
        setState(prev => ({...prev, record}));
        setVisible(prev => ({...prev, update: true}));
    };

    const props = {
        visible, setVisible, state, onExport, 
        showModal, showUpdateModal, onDelete,   
        fetchDonorContacts: () => fetchDonorContacts(dispatch)
    };
    return <DonorContact {...props} />;
}