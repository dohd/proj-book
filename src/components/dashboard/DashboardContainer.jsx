import React, { useEffect, useState } from 'react';

import Dashboard from './Dashboard';
import { Auth } from 'api';
import RouteResolver, { Path } from 'routes';
import { 
    useTracked, 
    fetchResources, 
    socketUpdateResources 
} from 'context';
import { clientSocket } from 'utils';

export default function DashboardContainer({ location, history }) {
    const [store, dispatch] = useTracked();
    useEffect(() => fetchResources(dispatch), [dispatch]);
    useEffect(() => {
        fetchResources(dispatch)
        clientSocket.init();
        socketUpdateResources(dispatch);
    }, [dispatch]);

    const [state, setState] = useState({
        name: '', imageUrl: ''
    });

    const { profileImage, orgProfile } = store;
    const name = useMemo(() => {
        return orgProfile.detail?.name || '';
    }, [orgProfile]);
    const imageUrl = useMemo(() => profileImage.url, [profileImage]);
        
        const name = orgProfile.detail?.name;
        if (name) setState(prev => ({...prev, name}));
    }, [orgProfile, profileImage]);
        
    const [routePaths, setRoutePaths] = useState([]);
    useEffect(() => {
        const urls = RouteResolver(location.pathname);
        setRoutePaths(urls)
    }, [location.pathname]);

    // Logout logic
    const toggleLogout = () => {
        Auth.logout();
        history.push(Path.login);
    };

    // Drawer logic
    const [visible, setVisible] = useState(false);
    const showDrawer = () => setVisible(true);
    const onClose = () => setVisible(false);
    useEffect(() => setVisible(false), [location.pathname]);

    // Logout logic
    const toggleLogout = () => {
        Auth.logout();
        history.push(Path.login);
    };

    const props = {
        routePaths, visible, showDrawer, 
        onClose, toggleLogout,
        profileName: name,
        profileImage: imageUrl
    };
    return <Dashboard {...props} />;
}
