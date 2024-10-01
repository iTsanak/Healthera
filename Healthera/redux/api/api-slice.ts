import { createApi, type BaseQueryFn } from "@reduxjs/toolkit/query/react";

import type { AxiosRequestConfig, AxiosError } from "axios";
import apiClient from "./baseApiClient";

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Custom Base Query
//////////////////////////////////////////////////////////////

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await apiClient({
        url: url,
        method: method,
        data: data,
        params: params,
        headers: headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// RTK API
//////////////////////////////////////////////////////////////

export const apiSlice = createApi({
  baseQuery: axiosBaseQuery(),
  tagTypes: ["UserImageAnalysis", "RecentUserImageAnalysis"],
  endpoints(build) {
    return {
      //   query: build.query({ query: () => ({ url: "/query", method: "get" }) }),
      //   mutation: build.mutation({
      //     query: () => ({ url: "/mutation", method: "post" }),
      //   }),
    };
  },
});

// export const {} = apiSlice;
