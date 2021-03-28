import React from 'react';
import {Redirect, Route} from 'react-router-dom';

export const PrivateRoute = ({component: Component, props, ...rest}) => (
    <Route {...rest} render={p => (
        localStorage.getItem('AUTH')
            ? <Component {...p} {...props}/>
            : <Redirect to={{pathname: '/login', state: {from: p.location}}}/>
    )}/>
);
