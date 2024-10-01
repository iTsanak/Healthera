import qs from "query-string";

// ACCESS TOKEN is required

export type GetUserResponseData = {
  email: string;
  first_name: string;
  last_name: string;
  pk: string;
  username: string;
};

export const GET_USER_URL = qs.stringifyUrl({
  url: `${process.env.EXPO_PUBLIC_BASE_URL_REST_API}/api/v1/auth/default/user/`,
});

export const GET_USER_ENDPOINT = qs.stringifyUrl({
  url: `/api/v1/auth/default/user/`,
});
