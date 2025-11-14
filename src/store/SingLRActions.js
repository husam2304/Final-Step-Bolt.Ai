import { createAsyncThunk } from "@reduxjs/toolkit";
import * as signalR from '@microsoft/signalr';
import { resetConnection } from "./SignLRStore";
import apiEndpoint from "../services/api/apiEndpoints";
let connection = null;

export const initializeConnection = createAsyncThunk(
    'signalr/initialize',
    async ({ token, UserId }, { rejectWithValue, dispatch }) => {
        try {
            connection = new signalR.HubConnectionBuilder()
                .withUrl(`${apiEndpoint.signalR.notificationHub}`, {
                    accessTokenFactory: () => token,
                    skipNegotiation: true,
                    transport: signalR.HttpTransportType.WebSockets
                })
                .configureLogging(signalR.LogLevel.None) // 🔇 هذا يخفي كل اللوجات
                .withAutomaticReconnect({
                    nextRetryDelayInMilliseconds: (retryContext) => {
                        if (retryContext.previousRetryCount >= 5) {
                            return rejectWithValue('Max reconnect attempts reached');
                        }
                        return Math.min(retryContext.elapsedMilliseconds * 2, 10000);
                    }
                })
                .build();

            // Set up event handlers
            connection.onclose((error) => {
                dispatch(stopConnection(error));
            });

            connection.onreconnected((connectionId) => {
                dispatch(handleReconnect({ connectionId, UserId }));
            });

            // Start the connection
            if (UserId) {
                const response = await dispatch(startConnection({ connection, UserId }));
                if (response.error) {
                    return rejectWithValue(response.error);
                }
            }
            return null;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const registerUser = createAsyncThunk(
    'signalr/registerUser',
    async ({ connection, UserId }, { rejectWithValue }) => {
        try {
            await connection.invoke("GetConnectionId", UserId);
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
export const handleReconnect = createAsyncThunk(
    'signalr/handleReconnect',
    async ({ connection, UserId }, { rejectWithValue, dispatch, getState }) => {
        const attemptReconnect = async () => {
            const reconnectAttempts = getState().signalr.reconnectAttempts;
            const success = await dispatch(startConnection({ connection, UserId }));
            if (success.error) {
                if (reconnectAttempts < 5) {
                    setTimeout(attemptReconnect, Math.min(1000 * Math.pow(2, reconnectAttempts), 10000));
                } else {
                    return rejectWithValue('Max reconnection attempts reached');
                }
            }
        };
        return attemptReconnect();
    }
);
export const startConnection = createAsyncThunk(
    'signalr/startConnection',
    async ({ connection, UserId }, { rejectWithValue, dispatch }) => {
        try {
            await connection.start();
            await dispatch(registerUser({ connection, UserId }));
            return null; // Indicate success
        } catch (error) {
            return rejectWithValue(error.message);
        }
    });



export const stopConnection = () => {
    return async (dispatch) => {
        dispatch(resetConnection());
    }
}

export const getConnection = () => connection;