import { navigate } from '@reach/router';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const TOKEN_KEY = 'token';

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        switch (error.response.status) {
            case 401:
                navigate('/login');
                break;
            case 404:
            case 403:
                navigate('/');
                break;
        }
        return Promise.reject(error.response);
    },
);

export function setToken(token: string | null) {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = `Token ${token}`;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

type JWTPayload = {
    id: string;
    username: string;
    exp: number;
};

export function isTokenValid(token: string) {
    try {
        const decoded_jwt: JWTPayload = jwtDecode(token);
        const current_time = Date.now().valueOf() / 1000;
        return decoded_jwt.exp > current_time;
    } catch (error) {
        return false;
    }
}

export default axios;
