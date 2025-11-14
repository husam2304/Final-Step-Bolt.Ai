// features/signalr/signalrSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
    initializeConnection,
    registerUser,
    startConnection
} from './SingLRActions'

const initialState = {
    connection: null,
    status: 'disconnected', // 'disconnected' | 'connecting' | 'connected' | 'reconnecting'
    error: null,
    reconnectAttempts: 0
};



const signalrSlice = createSlice({
    name: 'signalr',
    initialState,
    reducers: {
        resetConnection: (state) => {
            if (state.connection) {
                state.connection.stop();
            }
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initializeConnection.pending, (state) => {
                state.status = 'connecting';
                state.error = null;
            })
            .addCase(initializeConnection.fulfilled, (state) => {
                state.status = 'connected';
                state.reconnectAttempts = 0;
            })
            .addCase(initializeConnection.rejected, (state, action) => {
                state.status = 'disconnected';
                state.error = action.payload;

            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload;
                state.status = 'disconnected';
            })
            .addCase(startConnection.pending, (state) => {
                state.status = 'connecting';
                state.error = null;
            })
            .addCase(startConnection.rejected, (state, action) => {
                state.status = 'disconnected';
                state.error = action.payload;
                state.reconnectAttempts += 1;

            })
            .addCase(startConnection.fulfilled, (state) => {
                state.status = 'connected';
                state.error = null;
                state.reconnectAttempts = 0;
            });
    }
});
export const { resetConnection } = signalrSlice.actions;
export default signalrSlice.reducer;