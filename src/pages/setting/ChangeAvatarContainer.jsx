import React, { useEffect, useState } from 'react';
import { message } from 'antd';

import './changeAvatar.css';
import ChangeAvatar from './ChangeAvatar';
import Api, {fetchAud} from 'api';
import { useTracked } from 'context';
import uploadTask from 'utils/firebaseConfig';
import { clientSocket } from 'utils';

const fetchProfileImage = dispatch => {
    Api.profileImage.get()
    .then(res => {
        dispatch({type: 'addProfileImage', payload: res});
        clientSocket.emit('profileImage', res);
    });
};

export default function ChangeAvatarContainer(params) {
    const [store, dispatch] = useTracked();

    const [url, setUrl] = useState('');
    useEffect(() => setUrl(store.profileImage.url), [store.profileImage]);

    const [loading, setLoading] = useState(false);

    const upload = async file => {
        const url = await uploadTask(`/profile/${file.name}`, file);
        const res = await Api.profileImage.post({url});
        if (res) fetchProfileImage(dispatch);
        setLoading(false);
    };

    const handleBeforeUpload = file => {
        const name = 'image-' + fetchAud();
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
 
    const props = {loading, url, handleBeforeUpload};
    return <ChangeAvatar {...props} />;
}