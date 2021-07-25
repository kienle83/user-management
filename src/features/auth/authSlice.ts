import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Admin from "../../models/admin";

export interface LoginPayload {
    username: string;
    password: string;
}

export interface AuthState {
    isLoggedIn: boolean;
    logging?: boolean;
    currentAdmin?: Admin;
}

const initialState: AuthState = {
    isLoggedIn: false,
    logging: false,
    currentAdmin: undefined,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginPayload>) {
            state.logging = true;
        },
        loginSuccess(state, action: PayloadAction<Admin>) {
            state.isLoggedIn = true;
            state.logging = false;
            state.currentAdmin = action.payload;
        },
        loginFailed(state, action: PayloadAction<string>) {
            state.logging = false;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.currentAdmin = undefined;
        },
    }
})

// actions
export const authActions = authSlice.actions;

// selectors
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectIsLogging = (state: any) => state.auth.logging;

// reducer
const authReducer = authSlice.reducer;
export default authReducer;