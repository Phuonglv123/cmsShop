import {IOrder, ITeam, IUser} from "../types";

export type AuthAction =
    | { type: 'LOGIN' }
    | { type: 'LOGIN_FAIL'; error: boolean }
    | { type: 'LOAD_USER'; user: IUser }
    | { type: 'LOGOUT' }
    | { type: 'CREATE_TEAM'; team: ITeam }
    | { type: 'FETCH_ORDER'; order: IOrder }

export interface AuthState {
    isAuthenticated: boolean;
    user: IUser | null;
    team: ITeam | null;
    order: IOrder | null;
    loading: boolean;
    error: boolean;
}

export const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    team: null,
    order: null,
    loading: false,
    error: false
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'LOGIN': {
            return {...state, isAuthenticated: true, loading: true};
        }
        case 'LOAD_USER': {
            return {...state, user: action.user, loading: false};
        }
        case "LOGIN_FAIL": {
            return {
                ...state,
                loading: false,
                error: true
            }
        }
        case "CREATE_TEAM": {
            return {...state, team: action.team}
        }
        case "FETCH_ORDER": {
            return {...state, order: action.order}
        }
        default:
            return state;
    }
}
