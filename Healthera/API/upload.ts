import qs from "query-string";

export const UPLOAD_URL = qs.stringifyUrl({
  url: `${process.env.EXPO_PUBLIC_REST_API_SERVER}/upload/`,
});
