import qs from "query-string";

export const ANALYSIS_URL = (uuid: string) => {
  return qs.stringifyUrl({
    url: `${process.env.EXPO_PUBLIC_REST_API_SERVER}/check-analysis/${uuid}/`,
  });
};
