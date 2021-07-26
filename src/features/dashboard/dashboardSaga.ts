import { all, call, put, takeLatest } from "redux-saga/effects";
import userApi from "../../api/userApi";
import { User } from "../../models";
import { dashboardActions } from "./dashboardSlice";

function* fetchStatistics() {
    const data: User[] = yield call(userApi.getAll, {});
    const totalRows = data.length;
    const [userCount, cityCount, companyCount] = [totalRows, totalRows, totalRows];
    yield put(
        dashboardActions.setStatistics({ userCount, cityCount, companyCount })
    );
}

function* fetchDashboardData() {
    try {
        yield all([
            call(fetchStatistics)
        ]);
        yield put(dashboardActions.fetchDataSuccess());
    } catch (error) {
        console.log('failed to fetch dashboard data', error);
        yield put(dashboardActions.fetchDataFailed());
    }
}

export default function* dashboardSaga() {
    yield takeLatest(dashboardActions.fetchData.type, fetchDashboardData);
}