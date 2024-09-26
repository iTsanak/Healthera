import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CHANGE_NAME_ENDPOINT, ChangeNameRequestData, ChangeNameResponseData } from "@/API-types/change-name";
import { UPDATE_PROFILE_IMAGE_ENDPOINT, UpdateProfileImageResponseData } from "@/API-types/update-profile-image";
import { REGISTER_URL, RegisterRequestData, RegisterResponseData } from "@/API-types/register";
import { CHANGE_PASSWORD_ENDPOINT, ChangePasswordRequestData } from "@/API-types/change-password";
import { LOGIN_URL, LoginRequestData, LoginResponseData } from "@/API-types/login";
import logAxiosError from "@/lib/axios-better-errors";
import { apiSlice } from "../api/api-slice";
import axios from "axios";

import { createAppAsyncThunk } from "@/redux/with-types";

import { getDeviceId } from "./device-id";
import { checkIfEmailIsAvailable } from "./check-email-availability";
import { getStoredUser, removeStoredUser, setStoredUser } from "./stored-user";

import { tokensDefined } from "../auth-secrets/auth-secrets-slice";
import { removeAllStoredTokens, setAllStoredTokens } from "../auth-secrets/storage-tokens";

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// State Config
//////////////////////////////////////////////////////////////

export interface User {
  id: string | null;
  email: string | null;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  imageURL: string | null;
}

interface AuthState extends User {
  status: "idle" | "pending" | "succeeded" | "rejected";
  initialLoadStatus: "idle" | "loading" | "loaded" | "failed";
  loginError: string | null;
  registerError: string | null;
}

const initialState: AuthState = {
  id: null,
  email: null,
  username: null,
  firstName: null,
  lastName: null,
  imageURL: null,
  status: "idle",
  initialLoadStatus: "idle",
  loginError: null,
  registerError: null,
};

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Async Thunks
//////////////////////////////////////////////////////////////

export const loadUser = createAppAsyncThunk(
  "auth/loadUser",
  async () => {
    console.log("[AUTH_SLICE]: fn loadUser: running...");

    const user = await getStoredUser();
    if (!user) {
      console.log("[AUTH_SLICE]: fn loadUser: Failed to find an user saved in memory");
      throw new Error("Failed to find an user saved in memory");
    }
    return user;
  },
  {
    condition(_unused, thunkApi) {
      const postsStatus = selectAuthStatus(thunkApi.getState());
      if (postsStatus !== "idle") {
        console.log("[AUTH_SLICE]: fn loadUser: condition failed...");
        return false;
      }
    },
  },
);

export const login = createAppAsyncThunk(
  "auth/login",
  async (loginData: { email: string; password: string }, thunkApi) => {
    try {
      console.log("[AUTH_SLICE]: fn login: running...");

      const deviceId = await getDeviceId();

      const requestData: LoginRequestData = {
        password: loginData.password,
        email: loginData.email,
        device_id: deviceId,
      };

      const response: LoginResponseData = (await axios.post(LOGIN_URL, requestData)).data;

      thunkApi.dispatch(
        tokensDefined({
          accessToken: response.access,
          refreshToken: response.refresh,
        }),
      );

      const user: User = {
        id: response.user.pk,
        email: response.user.email,
        username: response.user.username,
        firstName: response.user.first_name,
        lastName: response.user.last_name,
        imageURL: response.user.imageURL,
      };

      await setStoredUser(user);
      await setAllStoredTokens(response.access, response.refresh);

      return user;
    } catch (error) {
      logAxiosError(error, "[AUTH_SLICE]: fn login:");
      if (axios.isAxiosError(error)) throw new Error(error.response?.data["non_field_errors"]);
      else throw new Error("testing");
    }
  },
  {
    condition(_unused, thunkApi) {
      const postsStatus = selectAuthStatus(thunkApi.getState());
      if (postsStatus === "pending" || postsStatus === "succeeded") {
        console.log("[AUTH_SLICE]: fn login: condition failed...");
        return false;
      }
    },
  },
);

export const register = createAppAsyncThunk(
  "auth/register",
  async (
    registerData: {
      firstName: string;
      lastName?: string;
      email: string;
      password: string;
    },
    thunkApi,
  ) => {
    try {
      console.log("[AUTH_SLICE]: fn register: running...");

      registerData.email = registerData.email.toLowerCase().trim();

      if (!(await checkIfEmailIsAvailable(registerData.email))) {
        console.log("[AUTH_SLICE]: fn register: Email is already in use");
        throw new Error("Email is already in use");
      }

      const deviceId = await getDeviceId();

      const requestData: RegisterRequestData = {
        email: registerData.email,
        password1: registerData.password,
        password2: registerData.password,
        device_id: deviceId,
        first_name: registerData.firstName,
        last_name: registerData.lastName,
      };

      const response: RegisterResponseData = (await axios.post(REGISTER_URL, requestData)).data;

      thunkApi.dispatch(
        tokensDefined({
          accessToken: response.access,
          refreshToken: response.refresh,
        }),
      );

      const user: User = {
        id: response.user.pk,
        email: response.user.email,
        username: response.user.username,
        firstName: response.user.first_name,
        lastName: response.user.last_name,
        imageURL: "",
      };

      await setStoredUser(user);
      await setAllStoredTokens(response.access, response.refresh);

      return user;
    } catch (error) {
      logAxiosError(error, "[AUTH_SLICE]: fn register:");
      throw error;
    }
  },
  {
    condition(_unused, thunkApi) {
      const postsStatus = selectAuthStatus(thunkApi.getState());
      if (postsStatus === "pending" || postsStatus === "succeeded") {
        console.log("[AUTH_SLICE]: fn register: condition failed...");
        return false;
      }
    },
  },
);

export const logout = createAppAsyncThunk("auth/logout", async (_unused, thunkApi) => {
  console.log("[AUTH_SLICE]: fn logout: running...");
  await removeAllStoredTokens();
  await removeStoredUser();
});

export const changeName = createAppAsyncThunk("auth/changeName", async (registerData: {}, thunkApi) => {
  console.log("[AUTH_SLICE]: fn changeName: running...");
  // TODO
});

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Slice
//////////////////////////////////////////////////////////////

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn(state, action: PayloadAction<User>) {
      console.log("[AUTH_SLICE]: Action loggedIn...");

      return {
        ...state,
        ...action.payload,
        status: "succeeded",
        initialLoadStatus: "loaded",
        loginError: null,
        registerError: null,
      };
    },
    loggedOut() {
      console.log("[AUTH_SLICE]: Action loggedOut...");
      return initialState;
    },
    loginErrorCleared(state) {
      console.log("[AUTH_SLICE]: Action errorCleared...");
      state.loginError = null;
    },
    registerErrorCleared(state) {
      console.log("[AUTH_SLICE]: Action errorCleared...");
      state.registerError = null;
    },
    imageUrlUpdated(state, action: PayloadAction<{ imageURL: string }>) {
      console.log("[AUTH_SLICE]: Action imageUrlUpdated...");
      state.imageURL = action.payload.imageURL;
    },
    nameChanged(state, action: PayloadAction<{ firstName: string; lastName: string }>) {
      console.log("[AUTH_SLICE]: Action nameChanged...");
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
  },
  selectors: {
    selectAuthData: (authState) => authState,
    selectUserId: (authState) => authState.id,
    selectUserEmail: (authState) => authState.email,
    selectUserUsername: (authState) => authState.username,
    selectUserFirstName: (authState) => authState.firstName,
    selectUserLastName: (authState) => authState.lastName,
    selectUserImageURL: (authState) => authState.imageURL,
    selectAuthStatus: (authState) => authState.status,
    selectAuthInitialLoadStatus: (authState) => authState.initialLoadStatus,
    selectAuthLoginError: (authState) => authState.loginError,
    selectAuthRegisterError: (authState) => authState.registerError,
  },
  extraReducers: (builder) => {
    builder

      //////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////// loadUser Thunk
      //////////////////////////////////////////////////////////////

      .addCase(loadUser.pending, (state) => {
        state.initialLoadStatus = "loading";
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.initialLoadStatus = "failed";
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.initialLoadStatus = "loaded";
        state.loginError = null;
        state.registerError = null;

        state.id = action.payload.id;
        state.email = action.payload.email;
        state.username = action.payload.username;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.imageURL = action.payload.imageURL;
      })

      //////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////// login Thunk
      //////////////////////////////////////////////////////////////

      .addCase(login.pending, (state) => {
        state.status = "pending";
      })
      .addCase(login.rejected, (state, action) => {
        state.loginError = action.error.message ?? "Unknown Error";
        state.status = "rejected";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.initialLoadStatus = "loaded";
        state.loginError = null;
        state.registerError = null;

        state.id = action.payload.id;
        state.email = action.payload.email;
        state.username = action.payload.username;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.imageURL = action.payload.imageURL;
      })

      //////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////// register Thunk
      //////////////////////////////////////////////////////////////

      .addCase(register.pending, (state) => {
        state.status = "pending";
      })
      .addCase(register.rejected, (state, action) => {
        state.registerError = action.error.message ?? "Unknown Error";
        state.status = "rejected";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.initialLoadStatus = "loaded";
        state.loginError = null;
        state.registerError = null;

        state.id = action.payload.id;
        state.email = action.payload.email;
        state.username = action.payload.username;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.imageURL = action.payload.imageURL;
      })

      //////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////// Clear auth on logout
      //////////////////////////////////////////////////////////////

      .addCase(logout.fulfilled, (state) => {
        console.log("[AUTH_SLICE]: addCase matched: logout...");
        return initialState; // NOSONAR
      });
  },
});

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Slice Exports
//////////////////////////////////////////////////////////////

export default authSlice.reducer;
export const {
  selectAuthData,
  selectAuthLoginError,
  selectAuthRegisterError,
  selectAuthStatus,
  selectUserEmail,
  selectUserFirstName,
  selectUserId,
  selectUserImageURL,
  selectUserLastName,
  selectUserUsername,
  selectAuthInitialLoadStatus,
} = authSlice.selectors;
export const { loggedIn, loggedOut, loginErrorCleared, registerErrorCleared, imageUrlUpdated, nameChanged } =
  authSlice.actions;

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Custom Selector Exports
//////////////////////////////////////////////////////////////

export const selectAuthUser = createSelector(
  [selectUserId, selectUserEmail, selectUserUsername, selectUserFirstName, selectUserLastName, selectUserImageURL],
  (id, email, username, firstName, lastName, imageURL) => {
    const user: User = {
      id: id,
      email: email,
      username: username,
      firstName: firstName,
      lastName: lastName,
      imageURL: imageURL,
    };
    return user;
  },
);

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Auth API Slice
//////////////////////////////////////////////////////////////

export const apiSliceWithAuth = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////// change profile image
    //////////////////////////////////////////////////////////////

    changeProfileImage: builder.mutation<UpdateProfileImageResponseData, { imageUri: string }>({
      query: ({ imageUri }) => {
        const formData = new FormData();
        formData.append("image", {
          uri: imageUri,
          name: "image.jpg",
          type: "image/jpeg",
        } as any);
        return {
          url: UPDATE_PROFILE_IMAGE_ENDPOINT,
          data: formData,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(imageUrlUpdated({ imageURL: data.profile_image_url }));
        } catch (error) {
          console.log("[AUTH_SLICE]: fn onQueryStarted: failed:", error);
        }
      },
    }),

    //////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////// change name image
    //////////////////////////////////////////////////////////////

    changeName: builder.mutation<ChangeNameResponseData, ChangeNameRequestData>({
      query: (requestData) => {
        return {
          url: CHANGE_NAME_ENDPOINT,
          data: requestData,
          method: "PATCH",
        };
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(nameChanged({ firstName: data.first_name, lastName: data.last_name }));
        } catch (error) {
          console.log("[AUTH_SLICE]: fn changeName: failed:", error);
        }
      },
    }),

    //////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////// change password image
    //////////////////////////////////////////////////////////////

    changePassword: builder.mutation<null, ChangePasswordRequestData>({
      query: (requestData) => {
        return {
          url: CHANGE_PASSWORD_ENDPOINT,
          data: requestData,
          method: "POST",
        };
      },
      // onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
      //   try {
      //     const { data } = await queryFulfilled;
      //     dispatch(......({ imageURL: data.profile_image_url }));
      //   } catch (error) {
      //     console.log("[AUTH_SLICE]: fn onQueryStarted: failed:", error);
      //   }
      // },
    }),
  }),
});

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// API Hooks Exports
//////////////////////////////////////////////////////////////

export const { useChangeProfileImageMutation, useChangeNameMutation, useChangePasswordMutation } = apiSliceWithAuth;
