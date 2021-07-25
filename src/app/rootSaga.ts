import { all } from 'redux-saga/effects';
import authSaga from '../features/auth/authSaga';
import dashboardSaga from '../features/dashboard/dashboardSaga';
import userSaga from '../features/user/userSaga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        userSaga(),
        dashboardSaga()
    ]);
}