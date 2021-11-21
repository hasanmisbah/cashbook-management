import axios from 'axios';
import { BASE_API_URL } from '../utils/constants';
import { AUTH_TOKEN_NAME } from '../utils/constants';
import { getFromLocalStorage } from '../utils/helper';

const http = axios.create({
    responseType: 'json',
    baseURL: BASE_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'app': 'web'
    },
});

http.interceptors.request.use(function (config) {
    // add access token to the request
    const accessToken = getFromLocalStorage(AUTH_TOKEN_NAME, false);

    if (accessToken) {
        config.headers.common.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

export default http;
