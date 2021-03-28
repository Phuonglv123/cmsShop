import React from 'react';
import {AuthAction, authReducer, AuthState, initialState} from "../reducers/AuthReducer";
import API from "../services/api/API";

type AuthContextProps = {
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
};

const AuthContext = React.createContext<AuthContextProps>({
    state: initialState,
    dispatch: () => initialState,
});

export function AuthProvider(props: React.PropsWithChildren<{}>) {
    const [state, dispatch] = React.useReducer(authReducer, initialState);
    React.useEffect(() => {
        const token = localStorage.getItem('auth')

        if (!token) return;

        if (API.isTokenValid(token)) {
            API.setToken(token)
            dispatch({type: 'LOGIN'});
        } else {
            dispatch({type: 'LOGOUT'});
            // logout();
        }
    }, []);

    return <AuthContext.Provider value={{state, dispatch}} {...props} />;
}

export default function useAuth() {
    return React.useContext(AuthContext);
}
