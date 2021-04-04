import { IUser } from '../types';

export type AuthAction =
    | {
    type: 'LOGIN';
}
    | {
    type: 'LOAD_USER';
    payload: IUser;
}
    | { type: 'LOGOUT' };

export interface AuthState {
    isAuthenticated: boolean;
    payload: IUser | null;
}

export const initialState: AuthState = {
    isAuthenticated: false,
    payload: null,
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'LOGIN': {
            return { ...state, isAuthenticated: true };
        }
        case 'LOAD_USER': {
            return { ...state, payload: action.payload };
        }
        case 'LOGOUT': {
            return { isAuthenticated: false, payload: null };
        }
        default:
            return state;
    }
}
