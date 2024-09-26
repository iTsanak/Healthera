import { USER_PRODUCTS_LIST_ENDPOINT, UserProductsListResponseData } from "@/API-types/user-products-list";
import { ImageAnalysisResponseData, RECENT_USER_ANALYSES_ENDPOINT } from "@/API-types/recent-user-analyses";
import { UPLOAD_ENDPOINT } from "@/API-types/upload";

import { apiSlice } from "../api/api-slice";
import { createAppAsyncThunk } from "../with-types";

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Products Slice Data
//////////////////////////////////////////////////////////////

interface AllProductsApiData extends UserProductsListResponseData {
  reset?: boolean;
  page: number;
}

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Products Slice Thunks
//////////////////////////////////////////////////////////////

export const productUploadComplete = createAppAsyncThunk(
  "products/uploadComplete",
  async ({ uuid }: { uuid: string }, thunkApi) => {
    console.log("[PRODUCT_SLICE]: fn productUploadComplete: running...");

    thunkApi.dispatch(
      apiSliceWithProducts.util.updateQueryData("getAllUserProducts", 1, (draft) => {
        return { ...draft, reset: true, results: [], page: 0 };
      }),
    );

    thunkApi.dispatch(apiSliceWithProducts.util.invalidateTags([{ type: "RecentUserImageAnalysis", id: "LIST" }]));
  },
);

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Products API Slice
//////////////////////////////////////////////////////////////

export const apiSliceWithProducts = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////// Get All products
    //////////////////////////////////////////////////////////////

    getAllUserProducts: builder.query<AllProductsApiData, number>({
      query: (page = 1) => ({ url: USER_PRODUCTS_LIST_ENDPOINT(page) }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newData, { arg }) => {
        if (arg === 1 || currentCache.reset) {
          // If it's the first page or reset flag is true, return new data
          return {
            count: newData.count,
            next: newData.next,
            previous: newData.previous,
            results: newData.results,
            reset: false,
            page: 1,
          };
        }
        // Otherwise, merge the results
        return {
          ...currentCache,
          results: [...currentCache.results, ...newData.results],
          next: newData.next,
          page: (currentCache.page || 1) + 1,
        };
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: (result) =>
        result
          ? [
              { type: "UserImageAnalysis", id: "LIST" },
              ...result.results.map(({ id }) => ({ type: "UserImageAnalysis", id }) as const),
            ]
          : [{ type: "UserImageAnalysis", id: "LIST" }],
    }),

    //////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////// Upload new product
    //////////////////////////////////////////////////////////////

    uploadNewProduct: builder.mutation<{ uuid: string }, { imageUri: string }>({
      query: ({ imageUri }) => {
        const formData = new FormData();
        formData.append("image", {
          uri: imageUri,
          name: "image.jpg",
          type: "image/jpeg",
        } as any);
        return {
          url: UPLOAD_ENDPOINT,
          data: formData,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          // Reset the cache and refetch from the first page
          dispatch(
            apiSliceWithProducts.util.updateQueryData("getAllUserProducts", 1, (draft) => {
              return { ...draft, reset: true, results: [], page: 0 };
            }),
          );
        } catch {
          // Handle error
        }
      },
    }),

    //////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////// Get 50 most recent uploads
    //////////////////////////////////////////////////////////////

    getRecentUserProducts: builder.query<ImageAnalysisResponseData[], void>({
      query: () => ({
        url: RECENT_USER_ANALYSES_ENDPOINT,
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "RecentUserImageAnalysis", id: "LIST" },
              ...result.map(({ id }) => ({ type: "RecentUserImageAnalysis", id }) as const),
            ]
          : [{ type: "RecentUserImageAnalysis", id: "LIST" }],
    }),
  }),
});

//////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Hooks Exports
//////////////////////////////////////////////////////////////

export const { useGetAllUserProductsQuery, useUploadNewProductMutation, useGetRecentUserProductsQuery } =
  apiSliceWithProducts;
