import { GeminiJsonType } from "@/providers/analysis-provider";
import qs from "query-string";

export type AnalysisResponseData = {
  status: "completed" | "failed" | "pending";
  result: GeminiJsonType;
};

export const ANALYSIS_URL = (uuid: string) => {
  return qs.stringifyUrl({
    url: `${process.env.EXPO_PUBLIC_BASE_URL_REST_API}/check-analysis/${uuid}/`,
  });
};

export const ANALYSIS_ENDPOINT = (uuid: string) => {
  return qs.stringifyUrl({
    url: `/check-analysis/${uuid}/`,
  });
};
