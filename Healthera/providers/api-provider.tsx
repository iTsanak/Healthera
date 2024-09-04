import { useSession } from "@/providers/session-provider";
import axios, { AxiosInstance } from "axios";
import { createContext, useContext, useMemo } from "react";

type APIContextType = {
  api: AxiosInstance;
};

const APIContext = createContext<APIContextType | undefined>(undefined);

export const useAPI = () => {
  const context = useContext(APIContext);
  if (!context) {
    throw new Error("useAPIContext must be used within a APIProvider");
  }
  return context;
};

export function APIProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_REST_API_SERVER,
  });

  const {
    getAccessToken,
    verifyIfAccessTokenIsValid,
    refreshAccessToken,
    logout,
  } = useSession();

  api.interceptors.request.use(
    async (config) => {
      let token = await getAccessToken();
      if (token) {
        if (!(await verifyIfAccessTokenIsValid(token))) {
          token = await refreshAccessToken();
          console.log("[API_PROVIDER]: Attempting to refresh access token");
        }
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401) {
        await logout();
        alert("Session expired. Please log in again.");
        throw new Error("Session expired. Please log in again.");
      }
      return Promise.reject(error);
    },
  );

  const contextMemo = useMemo(
    () => ({
      api,
    }),
    [api],
  );

  return (
    <APIContext.Provider value={contextMemo}>{children}</APIContext.Provider>
  );
}
