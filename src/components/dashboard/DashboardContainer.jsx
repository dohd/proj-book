import React, { useEffect, useMemo, useState } from 'react';

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
    useEffect(() => {
        fetchResources(dispatch)
        clientSocket.init();
        socketUpdateResources(dispatch);
    }, [dispatch]);

    const { profileImage, orgProfile } = store;
    const name = useMemo(() => {
        return orgProfile.detail?.name || '';
    }, [orgProfile]);
    const imageUrl = useMemo(() => profileImage.url, [profileImage]);
        
    const routePaths = useMemo(() => {
        return RouteResolver(location.pathname);
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

    const props = {
        routePaths, visible, showDrawer, 
        onClose, toggleLogout,
        profileName: name,
        profileImage: imageUrl
    };
    return <Dashboard {...props} />;
}
