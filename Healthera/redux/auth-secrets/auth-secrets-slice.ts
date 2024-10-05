import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "@/redux/with-types";

import { REFRESH_TOKEN_URL, RefreshTokenRequestData, RefreshTokenResponseData } from "@/API-types/refresh-token";
import logAxiosError from "@/lib/axios-better-errors";
import axios from "axios";

import { getAllStoredTokens, setStoredAccessToken } from "./storage-tokens";

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Type check safety
//////////////////////////////////////////////////////////////

export const AUTH_LOGOUT_TYPE = "auth/logout/fulfilled";

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// State Config
//////////////////////////////////////////////////////////////

interface AuthSecrets {
  accessToken: string | null;
  refreshToken: string | null;
  accessTimestamp: number | null;
  deviceId: string | null;
}
interface AuthSecretsState extends AuthSecrets {
  status: "idle" | "pending" | "succeeded" | "rejected";
  initialLoadStatus: "idle" | "loading" | "loaded" | "failed";
  error: string | null;
}

const initialState: AuthSecretsState = {
  accessToken: null,
  refreshToken: null,
  accessTimestamp: null,
  deviceId: null,
  status: "idle",
  initialLoadStatus: "idle",
  error: null,
};

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Async Thunks
//////////////////////////////////////////////////////////////

export const loadTokens = createAppAsyncThunk(
  "authSecrets/loadTokens",
  async () => {
    console.log("[AUTH_SECRETS_SLICE]: fn loadTokens: running...");

    const { accessToken, refreshToken } = await getAllStoredTokens();
    if (!accessToken || !refreshToken) {
      console.log("[AUTH_SECRETS_SLICE]: fn loadTokens: Failed to load tokens from memory");
      throw new Error("Failed to load tokens from memory");
    }
    return { accessToken, refreshToken };
  },
  {
    condition(_unused, thunkApi) {
      const postsStatus = selectAuthSecretsStatus(thunkApi.getState());
      if (postsStatus !== "idle") {
        console.log("[AUTH_SECRETS_SLICE]: fn loadTokens: condition failed...");
        return false;
      }
    },
  },
);

export const refreshAccessToken = createAppAsyncThunk(
  "authSecrets/refreshAccessToken",
  async (_unused, thunkApi) => {
    try {
      console.log("[AUTH_SECRETS_SLICE]: fn refreshAccessToken: running...");

      const refreshToken = selectRefreshToken(thunkApi.getState());
      if (!refreshToken) {
        console.log("[AUTH_SECRETS_SLICE]: fn refreshAccessToken: no refresh token found");
        throw new Error("Failed to find valid refresh token");
      }
      const requestData: RefreshTokenRequestData = { refresh: refreshToken };
      const responseData: RefreshTokenResponseData = (await axios.post(REFRESH_TOKEN_URL, requestData)).data;

      await setStoredAccessToken(responseData.access);
      return responseData.access;
    } catch (error) {
      logAxiosError(error, "[AUTH_SECRETS_SLICE]: fn refreshAccessToken:");
      throw error;
    }
  },
  {
    condition(_unused, thunkApi) {
      const postsStatus = selectAuthSecretsStatus(thunkApi.getState());
      const lastRefreshTimestamp = selectAccessTimestamp(thunkApi.getState());

      // If the token refresh is already pending, prevent another refresh.
      if (postsStatus === "pending") {
        console.log("[AUTH_SECRETS_SLICE]: fn refreshAccessToken: pending status, blocking refresh...");
        return false;
      }

      // Calculate the time difference
      if (lastRefreshTimestamp) {
        const currentTimestamp = Date.now(); // Current timestamp
        const diffInMs = currentTimestamp - lastRefreshTimestamp; // Difference in milliseconds
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60)); // Convert to minutes

        // If the difference is less than 1 minute, block refresh
        if (diffInMinutes < 1) {
          console.log(
            "[AUTH_SECRETS_SLICE]: fn refreshAccessToken: less than 1 minute since last refresh, blocking...",
          );
          return false;
        }
      }

      // Allow the refresh if conditions are met
      return true;
    },
  },
);

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Slice
//////////////////////////////////////////////////////////////

const authSecretsSlice = createSlice({
  name: "authSecrets",
  initialState,
  reducers: {
    tokensDefined(state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) {
      console.log("[AUTH_SECRETS_SLICE]: action tokensDefined...");
      state.status = "succeeded";
      state.initialLoadStatus = "loaded";
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.accessTimestamp = Date.now();
    },
    accessTokenDefined(state, action: PayloadAction<string>) {
      console.log("[AUTH_SECRETS_SLICE]: action accessTokenDefined...");
      state.status = "succeeded";
      state.accessToken = action.payload;
      state.accessTimestamp = Date.now();
    },
    tokensCleared() {
      console.log("[AUTH_SECRETS_SLICE]: action tokensCleared...");
      return initialState;
    },
  },
  selectors: {
    selectRefreshToken: (authSecretsState) => authSecretsState.refreshToken,
    selectAccessToken: (authSecretsState) => authSecretsState.accessToken,
    selectAccessTimestamp: (authSecretsState) => authSecretsState.accessTimestamp,
    selectDeviceId: (authSecretsState) => authSecretsState.deviceId,
    selectAuthSecretsStatus: (authSecretsState) => authSecretsState.status,
    selectAuthSecretsError: (authSecretsState) => authSecretsState.error,
    selectAuthSecretsInitialLoadStatus: (authSecretsState) => authSecretsState.initialLoadStatus,
  },
  extraReducers(builder) {
    builder

      //////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////// loadTokens Thunk
      //////////////////////////////////////////////////////////////

      .addCase(loadTokens.pending, (state) => {
        state.initialLoadStatus = "loading";
      })
      .addCase(loadTokens.fulfilled, (state, action) => {
        state.initialLoadStatus = "loaded";
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.error = null;
      })
      .addCase(loadTokens.rejected, (state, action) => {
        state.initialLoadStatus = "failed";
        state.error = action.error.message ?? "Unknown Error";
      })

      //////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////// refreshAccessToken Thunk
      //////////////////////////////////////////////////////////////

      .addCase(refreshAccessToken.pending, (state) => {
        state.status = "pending";
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.accessToken = action.payload;
        state.accessTimestamp = Date.now();
        state.error = null;
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message ?? "Unknown Error";
      })

      //////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////// Clear auth on logout
      //////////////////////////////////////////////////////////////

      .addCase(AUTH_LOGOUT_TYPE, (state) => {
        console.log("[AUTH_SECRETS_SLICE]: addCase matched: logout...");
        return initialState; // NOSONAR
      });
  },
});

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Slice Exports
//////////////////////////////////////////////////////////////

export default authSecretsSlice.reducer;
export const { tokensDefined, accessTokenDefined, tokensCleared } = authSecretsSlice.actions;
export const {
  selectRefreshToken,
  selectAccessToken,
  selectAccessTimestamp,
  selectDeviceId,
  selectAuthSecretsError,
  selectAuthSecretsStatus,
  selectAuthSecretsInitialLoadStatus,
} = authSecretsSlice.selectors;
