import qs from "query-string";

export const UPLOAD_URL = qs.stringifyUrl({
  url: `${process.env.EXPO_PUBLIC_BASE_URL_REST_API}/upload/`,
});

export const UPLOAD_ENDPOINT = qs.stringifyUrl({
  url: `/upload/`,
});
