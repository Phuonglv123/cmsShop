import axios from 'axios';
import {IUser} from '../../types';

export type JWT = {
    token: string,
    user: IUser

}

class Auth {

    async login(params) {
        const res = await this.apiCall({
            url: 'api/auth/login/',
            method: 'POST',
            params: params
        });
        return res;
    }


    // async logout(deleteToken: boolean = false) {
    //     if (deleteToken) {
    //         const res = await this.apiCall({
    //             url: 'authentication/logout/',
    //             method: 'POST',
    //             params: {
    //                 token: this.token
    //             }
    //         });
    //     }
    //     localStorage.removeItem(JWT_KEY);
    // }

    saveJWT(jwt: JWT) {
        try {
            if (jwt) {
                localStorage.setItem('auth', JSON.stringify(jwt));
            }
        } catch (e) {
            console.log(e);
        }
    }


    async apiCall(option: Option & { token: string }) {
        option.method = option.hasOwnProperty('method') ? option.method : 'GET';
        option.params = option.hasOwnProperty('params') ? option.params : null;
        let headers = {
            'Content-type': 'application/json',
        };
        if (option.params && option.params.token) {
            headers['Authorization'] = `Token ${option.params.token}`
        }

        try {
            const res = await axios({
                method: option.method,
                headers: headers,
                url: `/${option.url}`,
                data: option.params,
                validateStatus: status => {
                    return true;
                },
            });
            return res.data;
        } catch (e) {
            console.log(e)
        }
    }
}

export default new Auth();

export type Option = {
    url: string,
    method: string,
    returnRaw: boolean,
    params: Object,
    headers?: Object,
    redirectOn403?: boolean,
}
