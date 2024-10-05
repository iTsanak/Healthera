import qs from "query-string";

export type RegisterRequestData = {
  email: string;
  password1: string;
  password2: string;
  device_id: string;
  first_name: string;
  last_name?: string;
  username?: string;
  dob?: string;
  phone_number?: string;
};

export type RegisterResponseData = {
  access: string;
  refresh: string;
  user: {
    pk: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  };
};

export const REGISTER_URL = qs.stringifyUrl({
  url: `${process.env.EXPO_PUBLIC_BASE_URL_REST_API}/api/v1/auth/register/`,
});

export const REGISTER_ENDPOINT = qs.stringifyUrl({
  url: `/api/v1/auth/register/`,
});
