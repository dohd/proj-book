import React, { useState } from 'react';

import './register.css';
import OrgProfileContainer from './OrgProfileContainer';
import BasicInfoContainer from './BasicInfoContainer';

export default function RegisterContainer() {
    const [state, setState] = useState({
       home: false,  
       profile: false,
       register: {}, 
    });

    const props = {state, setState};
    return (
        state.profile ? 
        <OrgProfileContainer {...props} /> : 
        <BasicInfoContainer {...props} />
    );
}
