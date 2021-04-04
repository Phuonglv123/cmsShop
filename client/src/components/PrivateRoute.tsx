import React from 'react';
import useAuth from '../context/auth';
import {Redirect, RouteComponentProps} from '@reach/router';

interface PrivateRouteProps extends RouteComponentProps {
    as: React.ElementType<any>;
}

export default function PrivateRoute({as: Comp, ...props}: PrivateRouteProps) {
    const {
        state: {payload},
    } = useAuth();
    return payload ? <Comp {...props} /> : <Redirect to="/login" noThrow/>;
}
