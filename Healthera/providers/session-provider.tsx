import React, { createContext, useState, useContext, useMemo } from "react";
import { LoginResponseData } from "@/API/login";
import { RegisterResponseData } from "@/API/register";
import { ChangeNameResponseData } from "@/API/change-name";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { VERIFY_TOKEN_URL, VerifyTokenRequestData } from "@/API/verify-token";
import { Platform } from "react-native";
import * as Application from "expo-application";
import {
  REFRESH_TOKEN_URL,
  RefreshTokenRequestData,
  RefreshTokenResponseData,
} from "@/API/refresh-token";
import {
  REFRESH_JWT_URL,
  RefreshJWTRequestData,
  RefreshJWTResponseData,
} from "@/API/refresh-jwt";
// TODO use SecureStore from "expo-secure-store"

// TODO update User Modal
export type SessionUser = {
  id: string;
  email: string;
  username?: string;
  first_name: string;
  last_name: string;
  imageURL?: string;
};

type SessionContextType = {
  user: SessionUser | null;
  register: (data: RegisterResponseData) => Promise<void>;
  login: (data: LoginResponseData) => Promise<void>;
  logout: () => Promise<void>;
  changeName: (data: ChangeNameResponseData) => Promise<void>;
  getAccessToken: () => Promise<string>;
  getRefreshToken: () => Promise<string>;
  loadStoredUser: () => Promise<SessionUser | null | undefined>;
  getDeviceId: () => Promise<string>;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export function SessionProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [user, setUser] = useState<SessionUser | null>(null);

  const register = async (data: RegisterResponseData) => {
    // TODO profile image missing
    // WARNING this function does not updated the backend database
    const newUser: SessionUser = {
      id: data.user.pk,
      email: data.user.email,
      username: data.user.username,
      first_name: data.user.first_name,
      last_name: data.user.last_name,
    };
    setUser(newUser);
    await setAccessToken(data.access);
    await setRefreshToken(data.refresh);
    await storeUser(newUser);
  };

  const login = async (data: LoginResponseData) => {
    // TODO profile image missing
    // WARNING this function does not updated the backend database
    const newUser: SessionUser = {
      id: data.user.pk,
      email: data.user.email,
      first_name: data.user.first_name,
      last_name: data.user.last_name,
      username: data.user.username,
    };
    setUser(newUser);
    await setAccessToken(data.access);
    await setRefreshToken(data.refresh);
    await storeUser(newUser);
  };

  const logout = async () => {
    setUser(null);
    await setAccessToken("");
    await setRefreshToken("");
    await AsyncStorage.removeItem("STORED_USER");
  };

  const resetPassword = async () => {
    // TODO implementation missing
    return false;
  };
  const changePassword = async () => {
    // TODO implementation missing
    return false;
  };

  const changeName = async (data: ChangeNameResponseData) => {
    // WARNING !this function does not update the server database!
    try {
      if (!user) {
        throw new Error(
          "Trying to changeName without any user being logged in",
        );
      }
      const newUser: SessionUser = {
        email: data.email,
        id: data.pk,
        username: data.username,
        first_name: data.first_name,
        last_name: data.last_name,
      };
      setUser((user) => {
        return {
          ...newUser,
          imageURL: user?.imageURL,
        };
      });
      await storeUser(newUser);
    } catch (error) {
      console.log("[SESSION_PROVIDER]: Error change name:", error);
    }
  };

  const verifyIfAccessTokenIsValid = async (accessToken: string) => {
    let isValid = false;
    try {
      const requestData: VerifyTokenRequestData = { token: accessToken };
      await axios.post(VERIFY_TOKEN_URL, requestData);
      isValid = true;
    } catch (error) {
      console.log(
        "[SESSION_PROVIDER]: error verifyIfAccessTokenIsValid:",
        error,
      );
    }
    return isValid;
  };

  const refreshAccessToken = async () => {
    let newAccessToken = null;
    try {
      const refreshToken = await getRefreshToken();
      if (!refreshToken) {
        console.log(
          "[SESSION_PROVIDER]: Error, refreshAccessToken: no refresh token found",
        );
        logout();
        return "";
      }
      const requestData: RefreshTokenRequestData = { refresh: refreshToken };
      const responseData: RefreshTokenResponseData = (
        await axios.post(REFRESH_TOKEN_URL, requestData)
      ).data;
      await setAccessToken(responseData.access);
      newAccessToken = responseData.access;
    } catch (error) {
      console.log("[SESSION_PROVIDER]: error refreshAccessToken:", error);
    }
    return newAccessToken;
  };

  const refreshJWT = async () => {
    let newAccessToken = null;
    try {
      const deviceId = await getDeviceId();
      const refreshToken = await getRefreshToken();
      if (!refreshToken) {
        console.log(
          "[SESSION_PROVIDER]: Error, refreshJWT: no refresh token found",
        );
        logout();
        return "";
      }
      const requestData: RefreshJWTRequestData = {
        refresh: refreshToken,
        device_id: deviceId,
      };
      const responseData: RefreshJWTResponseData = (
        await axios.post(REFRESH_JWT_URL, requestData)
      ).data;
      await setRefreshToken(responseData.refresh);
      await setAccessToken(responseData.access);
      newAccessToken = responseData.access;
    } catch (error) {
      console.log("[SESSION_PROVIDER]: error refreshJWT:", error);
    }
    return newAccessToken;
  };

  const setAccessToken = async (token: string) => {
    // TODO: this should use SecureStore
    await AsyncStorage.setItem("ACCESS_TOKEN", token);
  };

  const getAccessToken = async () => {
    // TODO: this should use SecureStore
    let accessToken = await AsyncStorage.getItem("ACCESS_TOKEN");
    if (!accessToken) {
      console.log(
        "[SESSION_PROVIDER]: Error, getAccessToken: no access token found",
      );
      logout();
      return "";
    }

    if (!(await verifyIfAccessTokenIsValid(accessToken))) {
      // let newAccessToken = await refreshAccessToken();
      // if (newAccessToken) {
      //   accessToken = newAccessToken;
      // } else {
      //   newAccessToken = await refreshJWT();
      //   if (newAccessToken) {
      //     accessToken = newAccessToken;
      //   } else {
      //     console.log(
      //       "[SESSION_PROVIDER]: Error, getAccessToken: failed to refresh JWT",
      //     );
      //     logout();
      //     return "";
      //   }
      // }

      let newAccessToken = await refreshJWT();
      if (newAccessToken) {
        accessToken = newAccessToken;
      } else {
        console.log(
          "[SESSION_PROVIDER]: Error, getAccessToken: failed to refresh JWT",
        );
        logout();
        return "";
      }
    }

    return accessToken;
  };

  const setRefreshToken = async (token: string) => {
    // TODO: this should use SecureStore
    await AsyncStorage.setItem("REFRESH_TOKEN", token);
  };

  const getRefreshToken = async () => {
    // TODO: this should use SecureStore
    const token = await AsyncStorage.getItem("REFRESH_TOKEN");
    if (!token) {
      console.log("[SESSION_PROVIDER]: no refresh token found");
    }
    return token ?? "";
  };

  const storeUser = async (user: SessionUser) => {
    try {
      const jsonValue = JSON.stringify(user);
      await AsyncStorage.setItem("STORED_USER", jsonValue);
    } catch (error) {
      console.log("[SESSION_PROVIDER]: failed in storing STORED_USER", error);
    }
  };

  const loadStoredUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("STORED_USER");
      if (jsonValue != null) {
        const user: SessionUser = JSON.parse(jsonValue);
        setUser(() => user);
        return user.id ? user : null;
      }
      return null;
    } catch (error) {
      console.log(
        "[SESSION_PROVIDER]: failed in retrieving STORED_USER",
        error,
      );
    }
  };

  const getDeviceId = async () => {
    // TODO: this should use SecureStore
    let deviceId = await AsyncStorage.getItem("DEVICE_ID");
    if (!deviceId) {
      if (Platform.OS === "ios") {
        deviceId = await Application.getIosIdForVendorAsync();
      } else {
        deviceId = Application.getAndroidId();
      }
      if (!deviceId) {
        throw new Error("[SESSION_PROVIDER]: failed to retrieve deviceId");
      }
      await AsyncStorage.setItem("DEVICE_ID", deviceId);
    }
    return deviceId;
  };

  const contextMemo = useMemo(
    () => ({
      user,
      register,
      login,
      logout,
      changeName,
      getAccessToken,
      getRefreshToken,
      loadStoredUser,
      getDeviceId,
    }),
    [user],
  );

  return (
    <SessionContext.Provider value={contextMemo}>
      {children}
    </SessionContext.Provider>
  );
}
