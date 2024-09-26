import { AxiosInstance } from "axios";
import { refreshAccessToken, selectAccessToken } from "../auth-secrets/auth-secrets-slice";
import { getStoredAccessToken } from "../auth-secrets/storage-tokens";
import { logout } from "../auth/auth-slice";
import { AppStore } from "../store";

let isRefreshing = false;
let refreshSubscribers: Array<(token: string | null) => void> = [];

export const addInterceptors = (apiClient: AxiosInstance, store: AppStore) => {
  apiClient.interceptors.request.use(
    async (config) => {
      const state = store.getState();
      let accessToken = selectAccessToken(state);
      if (!accessToken) {
        accessToken = await getStoredAccessToken();
      }
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        console.log("[ADD_INTERCEPTOR]: fn response interceptor: running...");
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            console.log("[ADD_INTERCEPTOR]: fn response interceptor: subscribing");
            refreshSubscribers.push((token) => {
              if (token === null) {
                console.log("[ADD_INTERCEPTOR]: fn response interceptor: subscriber rejected");
                reject(error);
              } else {
                console.log("[ADD_INTERCEPTOR]: fn response interceptor: subscriber resolved");
                originalRequest.headers.Authorization = `Bearer ${token}`;
                originalRequest._retry = true;
                resolve(apiClient(originalRequest));
              }
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          console.log("[ADD_INTERCEPTOR]: fn response interceptor: running dispatch...");
          const newToken = await store.dispatch(refreshAccessToken()).unwrap();
          if (newToken) {
            console.log("[ADD_INTERCEPTOR]: fn response interceptor: action was successful...");
            refreshSubscribers.forEach((callback) => callback(newToken));
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return apiClient(originalRequest);
          } else {
            console.log("[ADD_INTERCEPTOR]: fn response interceptor: newToken is not valid...");
            throw new Error("Failed to refresh token");
          }
        } catch (refreshError) {
          console.log("[ADD_INTERCEPTOR]: fn response interceptor: Token refresh failed:", refreshError);
          store.dispatch(logout());
          alert("Session expired. Please log in again.");
          refreshSubscribers.forEach((callback) => callback(null));
          return Promise.reject(error);
        } finally {
          console.log("[ADD_INTERCEPTOR]: fn response interceptor: cleanup ");
          isRefreshing = false;
          refreshSubscribers = [];
        }
      }
      return Promise.reject(error);
    },
  );
};
