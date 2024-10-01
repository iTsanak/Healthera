import { GeminiJsonType } from "@/providers/analysis-provider";
import qs from "query-string";

export type ImageAnalysisResponseData = {
  id: string;
  result: GeminiJsonType;
  status: string;
  created_at: string;
  updated_at: string;
};

export const RECENT_USER_ANALYSES_URL = qs.stringifyUrl({
  url: `${process.env.EXPO_PUBLIC_BASE_URL_REST_API}/recent-user-analyses/`,
});

export const RECENT_USER_ANALYSES_ENDPOINT = qs.stringifyUrl({ url: `/recent-user-analyses/` });
