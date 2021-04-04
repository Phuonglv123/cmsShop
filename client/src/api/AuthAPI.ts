import API, {TOKEN_KEY} from './APIUtils';
import {IUser} from '../types';
import {setLocalStorage} from '../utils';
import {setToken} from './APIUtils';

type User = {
    user: IUser & { token: string };
};

function handleUserResponse({user: {token, ...user}}: User) {
    setLocalStorage(TOKEN_KEY, token);
    setToken(token);
    return user;
}

// export function getCurrentUser() {
//     const res = API.get<User>('/auth/current');
//     debugger
//     return res;
//
// }

export function login(username: string, password: string) {
    return API.post<User>('/auth/login', {
        user: {username, password},
    }).then((user) => handleUserResponse(user.data))
}

export function register(user: {
    username: string;
    email: string;
    password: string;
}) {
    return API.post<User>('/users', {user}).then((user) =>
        handleUserResponse(user.data),
    );
}

export function updateUser(user: IUser & Partial<{ password: string }>) {
    return API.put<User>('/user', {user});
}

export function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
}
