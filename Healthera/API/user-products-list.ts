import { GeminiJsonType } from "@/providers/analysis-provider";
import qs from "query-string";

export type ProductsListResultsType = {
  id: string;
  result: GeminiJsonType;
  status: string;
  created_at: string;
  updated_at: string;
};

export type UserProductsListResponseData = {
  count: number;
  previous: any;
  next: any;
  results: ProductsListResultsType[];
};

export const USER_PRODUCTS_LIST_URL = ({
  pageParam,
}: {
  pageParam: number;
}) => {
  return qs.stringifyUrl({
    url: `${process.env.EXPO_PUBLIC_REST_API_SERVER}/user-image-analyses/?pages=${pageParam}`,
  });
};

export const USER_PRODUCTS_LIST_ENDPOINT = (pageParam: number) => {
  return `/user-image-analyses/?pages=${pageParam}`;
};
