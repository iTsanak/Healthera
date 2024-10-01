import qs from "query-string";

export type RefreshTokenRequestData = {
  refresh: string;
};

export type RefreshTokenResponseData = {
  access: string;
  access_expiration: string;
};

export const REFRESH_TOKEN_URL = qs.stringifyUrl({
  url: `${process.env.EXPO_PUBLIC_BASE_URL_REST_API}/api/v1/auth/default/token/refresh/`,
});

export const REFRESH_TOKEN_ENDPOINT = "/api/v1/auth/default/token/refresh/";
