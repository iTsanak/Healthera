import qs from "query-string";

export type CheckEmailResponseData = {
  message: string;
  code: "IN_USE" | "AVAILABLE";
};

export type CheckEmailRequestData = {
  email: string;
};

export const CHECK_EMAIL_URL = qs.stringifyUrl({
  url: `${process.env.EXPO_PUBLIC_BASE_URL_REST_API}/api/v1/user/check-email/`,
});

export const CHECK_EMAIL_ENDPOINT = qs.stringifyUrl({
  url: `/api/v1/user/check-email/`,
});
