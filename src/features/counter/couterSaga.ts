import { PayloadAction } from "@reduxjs/toolkit";
import { call, delay, put, take, takeEvery, takeLatest } from "redux-saga/effects";
import { fetchCount } from "./counterAPI";
import { increment, incrementSaga, incrementSagaSuccess } from "./counterSlice";

export function* log(action: PayloadAction) {
    console.log('Log', action);
}

export function* handleIncrementSaga(action: PayloadAction<number>) {
    console.log('waiting 2s')
    // wait 1s
    yield delay(1000)

    // dispatch function
    console.log(action.type, action.payload);
    yield put(incrementSagaSuccess(action.payload))
}

export default function* counterSaga() {
    console.log('Counter saga');

    // listen all actions, each when action dispatched then run function log
    //yield takeEvery('*', log)

    // listen one specify action
    //yield takeEvery('counter/increment', log);
    //yield takeEvery(increment().type, log);

    //yield takeEvery('counter/incrementSaga', log);

    //yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
    yield takeLatest(incrementSaga.toString(), handleIncrementSaga);

}

function* test() {

    // 1 la goi truc tiep nhu the nay -> se tra ve 1 promise
    yield fetchCount(2)

    // and: dung 1 effect creator ten la call -> bao voi saga la hay thuc thi effect fetchCount 
    // -> tra ve 1 effect (js object) mieu ta la hay thuc hien ham nay
    yield call(fetchCount, 2);
}

