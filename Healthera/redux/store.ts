import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import authReducer from "@/redux/auth/auth-slice";
import authSecretsReducer from "@/redux/auth-secrets/auth-secrets-slice";
import notificationsReducer from "@/redux/notifications/notifications-slice";

import baseApiClient from "./api/baseApiClient";
import { addInterceptors } from "./api/addInterceptors";
import { apiSlice } from "./api/api-slice";

import { listenerMiddleware } from "./listener-middleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    authSecrets: authSecretsReducer,
    notifications: notificationsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware).concat(apiSlice.middleware),
});

// Infer the type of `store`
export type AppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>;
// Export a reusable type for handwritten thunks
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;

// Add interceptors after store is created
addInterceptors(baseApiClient, store);
