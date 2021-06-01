import axios from 'axios';

import errorHandler from './errorHandler';
import { fetchToken } from './tokenHandler';

const instance = axios.create();
instance.defaults.baseURL = window.env.API_URL;
instance.defaults.withCredentials = true;
instance.defaults.timeout = 10000;

// Request interceptor
instance.interceptors.request.use(config => {
    const token = fetchToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}, err => {
    return Promise.reject(err);
});

// Response interceptor
instance.interceptors.response.use(response => {
    return response.data;
}, err => {
    if (err.response && err.response.data) {
        return errorHandler(err.response.data);
    }
    return Promise.reject(err);
});

export default instance;
