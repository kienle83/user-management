import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { fork, take, call, put, delay } from 'redux-saga/effects';
import { authActions, LoginPayload } from "./authSlice";


function* handleLogin(payload: LoginPayload) {
    try {
        yield delay(500);
        sessionStorage.setItem('access_token', '1');
        yield put(authActions.loginSuccess({
            id: 1,
            name: 'Nord Cloud'
        }));

        // redirect to admin page after login successfully
        yield put(push('/admin'));
    } catch (error) {
        yield put(authActions.loginFailed(error.message))
    }
}

function* handleLogout() {
    yield delay(200);
    sessionStorage.removeItem('access_token');
    // redirect to login page after logout
    yield put(push('/login'));
}

function* watchLoginFlow() {
    while (true) {
        // if user is already logged in then we do not need watch login
        const isLoggedIn = Boolean(sessionStorage.getItem('access_token'))
        if (!isLoggedIn) {
            const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
            yield fork(handleLogin, action.payload);
        }
        yield take(authActions.logout.type);
        yield call(handleLogout);
    }
}

export default function* authSaga() {
    yield fork(watchLoginFlow)
}