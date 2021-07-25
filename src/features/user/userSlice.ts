import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ListParams, User } from "../../models";

export interface UserState {
    loading: boolean;
    list: User[];
    filter: ListParams;
    // pagination?: PaginationParams;
}

const initialState: UserState = {
    loading: false,
    list: [],
    filter: {
        _page: 1,
        _limit: 15,
    },
    // pagination: {
    //     _page: 1,
    //     _limit: 3,
    //     _totalRows: 10,
    // },
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUserList(state, action: PayloadAction<ListParams>) {
            state.loading = true;
        },
        fetchUserListSuccess(state, action: PayloadAction<User[]>) {
            state.list = action.payload;
            //state.pagination = action.payload.pagination;
            state.loading = false;
        },
        fetchUserListFailed(state) {
            state.loading = false;
        },

        setFilter(state, action: PayloadAction<ListParams>) {
            state.filter = action.payload;
        },

        setFilterWithDebounce(state, action: PayloadAction<ListParams>) { },
    },
});

// Actions
export const userActions = userSlice.actions;

// Selectors
export const selectUserList = (state: RootState) => state.user.list;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserFilter = (state: RootState) => state.user.filter;
// export const selectUserPagination = (state: RootState) => state.user.pagination;

// Reducer
const userReducer = userSlice.reducer;
export default userReducer;