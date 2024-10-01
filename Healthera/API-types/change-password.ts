import qs from "query-string";

// ACCESS TOKEN is required

export type ChangePasswordRequestData = {
  new_password1: string;
  new_password2: string;
};

export const CHANGE_PASSWORD_URL = qs.stringifyUrl({
  url: `${process.env.EXPO_PUBLIC_BASE_URL_REST_API}/api/v1/auth/default/password/change/`,
});

export const CHANGE_PASSWORD_ENDPOINT = qs.stringifyUrl({
  url: `/api/v1/auth/default/password/change/`,
});
