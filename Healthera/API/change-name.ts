import qs from "query-string";

// ACCESS TOKEN is required

export type ChangeNameRequestData = {
  first_name: string;
  last_name?: string;
};
export type ChangeNameResponseData = {
  pk: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
};

export const CHANGE_NAME_URL = qs.stringifyUrl({
  url: `${process.env.EXPO_PUBLIC_REST_API_SERVER}/api/v1/auth/default/user/`,
});
