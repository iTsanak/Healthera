import qs from "query-string";

export type VerifyTokenRequestData = {
  token: string;
};

export const VERIFY_TOKEN_URL = qs.stringifyUrl({
  url: `${process.env.EXPO_PUBLIC_BASE_URL_REST_API}/api/v1/auth/default/token/verify/`,
});

export const VERIFY_TOKEN_ENDPOINT = qs.stringifyUrl({
  url: `/api/v1/auth/default/token/verify/`,
});
