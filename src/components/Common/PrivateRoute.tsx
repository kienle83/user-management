import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export function PrivateRoute(props: RouteProps) {
    // Check if user is logged in    
    // check if sessionStorage has this key
    const isLoggedIn = Boolean(sessionStorage.getItem('access_token'));
    if (!isLoggedIn) return <Redirect to='/login' />;

    return <Route {...props} />;
}