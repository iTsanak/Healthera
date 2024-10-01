import qs from "query-string";

export type RefreshJWTRequestData = {
  refresh: string;
  device_id: string;
};

export type RefreshJWTResponseData = {
  access: string;
  refresh: string;
};

export const REFRESH_JWT_URL = qs.stringifyUrl({
  url: `${process.env.EXPO_PUBLIC_BASE_URL_REST_API}/api/v1/auth/jwt/refresh/`,
});

export const REFRESH_JWT_ENDPOINT = qs.stringifyUrl({
  url: `/api/v1/auth/jwt/refresh/`,
});
