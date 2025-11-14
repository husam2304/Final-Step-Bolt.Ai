import { createSlice } from '@reduxjs/toolkit'
import {
    login,
    Regerster,
    logout,
    GetUser,
} from './AuthActions'
const initialState = {
    user: {},
    role: [],
    token: localStorage.getItem('authToken') || null,
    authLoading: true,
    error: null,
    status: 'idle'
};
export const AuthSlice = createSlice({
    name: "auth",
    initialState: initialState,

    extraReducers: (builder) => {
        builder
            .addCase(GetUser.rejected, (state) => {
                state.token = null
                state.authLoading = false
                state.isAdmin = false
                state.user = null
            })
            .addCase(GetUser.pending, (state) => {
                state.authLoading = true;
            })
            .addCase(GetUser.fulfilled, (state, action) => {
                state.authLoading = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state) => {
                state.token = null
                state.authLoading = false
                state.isAdmin = false
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.authLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.authLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(Regerster.rejected, (state) => {
                state.token = null
                state.authLoading = false
                state.isAdmin = false
                state.user = null
            })
            .addCase(Regerster.pending, (state) => {
                state.authLoading = true;
            })
            .addCase(Regerster.fulfilled, (state, action) => {
                state.authLoading = false;
                state.user = action.payload.User;
                state.token = action.payload.token;
            })
            .addCase(logout.rejected, (state) => {
                state.token = null
                state.authLoading = false
                state.isAdmin = false
                state.user = null
            })
            .addCase(logout.pending, (state) => {
                state.authLoading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.authLoading = false;
                state.token = null
                state.authLoading = false
                state.user = null
            })
    }
});

export default AuthSlice.reducer;