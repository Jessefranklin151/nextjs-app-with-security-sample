import axios from 'axios';
import useSecurityStore from '../stores/SecurityStore';

const { REACT_APP_API_ENDPOINT } = process.env;

const http = axios.create({
    baseURL: REACT_APP_API_ENDPOINT
});

axios.interceptors.response.use(req => {
    const { token } = useSecurityStore((state) => ({ token: state.token }));
    if (!!token) {
        useSecurityStore((state) => (state.token = token));
    }
    req.headers["Content-Type"] = "application/json";
    return req;
});

export default http;