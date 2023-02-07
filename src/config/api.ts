import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, {
    retries: 0,
    retryDelay: count => count * 1000,
    retryCondition: error => {
        const shouldRetry =
            error.code !== 'ECONNABORTED' &&
            (!error.response || (error.response.status >= 500 && error.response.status <= 599));
        if (shouldRetry) {
            console.log('Retrying api...', error);
        }
        return shouldRetry;
    },
});

const METHODS_WITH_BODY = ['POST', 'PATCH', 'DELETE'];

const fetchWithTimeout = (url: string, requestInfo: any): any =>
    axios({
        method: requestInfo.method,
        url,
        timeout: requestInfo.timeout,
        headers: requestInfo.headers,
        data: requestInfo.body,
        'axios-retry': requestInfo['axios-retry'],
        withCredentials: true,
    });

export const api = (url: string, method: string, request: any, retryCount: number = 0, timeout: any = null) => {
    const defaultHeaders: any = {
        // 'x-api-key': serviceKey,
        'Content-Type': 'application/json',
        'Accept-Encoding': 'application/json',
    };

    const _timeout = timeout !== null ? timeout : 0;

    const requestInfo: any = {
        method,
        headers: defaultHeaders,
        timeout: _timeout * 1000,
        'axios-retry': {
            retries: retryCount,
        },
    };

    if (METHODS_WITH_BODY.includes(method) && request) {
        // request.body = JSON.stringify(request);
        requestInfo.body = JSON.stringify(request) || {};
    }

    if (METHODS_WITH_BODY.includes(method) && request.params) {
        requestInfo.params = JSON.stringify(request.params);
    }

    if (__DEV__) {
        console.log('API URL', url);
        console.log('API REQUEST', requestInfo);
    }

    return fetchWithTimeout(url, requestInfo)
        .then((response: any) => response.data)
        .catch((error: any) => {
            console.log(error);
            if (__DEV__) {
                console.log('API URL', url);
                console.log('API ERROR', error);
            }
            throw error.response;
        });
};
