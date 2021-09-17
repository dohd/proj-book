import React from 'react';
import { useParams } from 'react-router';

import Response from './Response';

export default function ResponseContainer(params) {
    console.log('params:',useParams());

    return <Response />;
}