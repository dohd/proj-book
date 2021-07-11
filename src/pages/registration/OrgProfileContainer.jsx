import React, { useState } from 'react';
import { useHistory } from 'react-router';

import OrgProfile from './OrgProfile';
import { Auth } from 'api';
import { Path } from 'routes';

export default function OrgProfileContainer({state, setState}) {
    const handleBack = () => setState(prev => ({
        ...prev, profile: !prev.profile
    }));
    const [isLoading, setLoading] = useState(false);
    const history = useHistory();

    const onFinish = values => {
        const data = {...state.register, ...values};
        setLoading(true);

        Auth.register(data)
        .then(res => history.push(Path.login))
        .catch(err => setLoading(false));
    };
    const onFinishFailed = err => console.log('Error:', err);

    const props = {isLoading, onFinish, onFinishFailed, handleBack};
    return <OrgProfile {...props} />;
}