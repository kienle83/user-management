import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface DashboardStatistics {
    userCount: number;
    cityCount: number;
    companyCount: number;
}

export interface DashboardState {
    loading: boolean;
    statistics: DashboardStatistics;
}

const initialState: DashboardState = {
    loading: false,
    statistics: {
        userCount: 0,
        cityCount: 0,
        companyCount: 0
    }
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        fetchData(state) {
            state.loading = true
        },
        fetchDataSuccess(state) {
            state.loading = false
        },
        fetchDataFailed(state) {
            state.loading = false
        },
        setStatistics(state, action: PayloadAction<DashboardStatistics>) {
            state.statistics = action.payload
        }
    }
});

// actions
export const dashboardActions = dashboardSlice.actions;

// selectors
export const selectDashboardLoading = (state: RootState) => state.dashboard.loading;
export const selectDashboardStatistics = (state: RootState) => state.dashboard.statistics;

// reducer
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;