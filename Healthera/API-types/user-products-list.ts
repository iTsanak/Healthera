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
  previous: any; // URL to previous page or NULL
  next: any; // URL to next page or NULL
  results: ProductsListResultsType[];
};

export const USER_PRODUCTS_LIST_URL = ({ pageParam }: { pageParam: number }) => {
  return qs.stringifyUrl({
    url: `${process.env.EXPO_PUBLIC_BASE_URL_REST_API}/user-image-analyses/?page=${pageParam}&pages=0`,
  });
};

export const USER_PRODUCTS_LIST_ENDPOINT = (pageParam: number) => {
  return `/user-image-analyses/?page=${pageParam}&pages=0`;
};
