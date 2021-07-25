import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { ListParams, User } from '../../models';
import { userActions } from './userSlice';
import userApi from '../../api/userApi';

function* fetchUserList(action: PayloadAction<ListParams>) {
    try {
        const response: User[] = yield call(userApi.getAll, action.payload);
        yield put(userActions.fetchUserListSuccess(response))
    } catch (error) {
        console.log('failed fetch user', error);
        yield put(userActions.fetchUserListFailed())
    }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
    yield put(userActions.setFilter(action.payload));
}

export default function* userSaga() {
    // watch fetch user action
    yield takeLatest(userActions.fetchUserList, fetchUserList);

    yield debounce(1000, userActions.setFilterWithDebounce.type, handleSearchDebounce);
}