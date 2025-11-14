import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthStrore";
import ThemeReducer from "./Themestore";
import signalrReducer from "./SignLRStore"
export default configureStore({
  reducer: {
    auth: authReducer,
    theme: ThemeReducer,
    signalR: signalrReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['signalr/initialize/fulfilled'],
        ignoredPaths: ['signalr.connection']
      }
    })
});
