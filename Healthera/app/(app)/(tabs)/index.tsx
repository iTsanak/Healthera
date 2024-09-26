import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import ProductCard from "@/components/Product/product-card";
import PrimaryButton from "@/components/Button/primary-button";
import GreenSpinner from "@/components/LoadingScreens/green-spinner";
import AvatarTopNavBar from "@/components/Navigation/avatar-top-navbar";

import { apiSlice } from "@/redux/api/api-slice";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { selectUserFirstName, selectUserLastName } from "@/redux/auth/auth-slice";
import {
  apiSliceWithProducts,
  productUploadComplete,
  useGetAllUserProductsQuery,
} from "@/redux/products/products-slice";

const HomeScreen = () => {
  const firstName = useAppSelector(selectUserFirstName);
  const lastName = useAppSelector(selectUserLastName);
  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center">
          <AvatarTopNavBar username={`${firstName} ${lastName}`} />
          <PastProductsList />

          {/* <InfiniteQueryDebugControls /> */}
        </View>
      </SafeAreaView>
    </ThemedView>
  );
};

const PastProductsList = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isFetching, refetch } = useGetAllUserProductsQuery(page);
  const currPage_RTK = data?.page ?? 1;

  useEffect(() => {
    if (data?.reset) {
      if (page != 1) {
        setPage(1);
      } else {
        refetch();
      }
    }
  }, [data?.reset, data?.results.length]);

  const loadMore = () => {
    if (data?.next && !isLoading && !isFetching && !data?.reset) {
      setPage(currPage_RTK + 1);
    }
  };

  // console.log("data", data?.page, currPage_RTK, page, data?.reset, isUninitialized, data?.results.length);

  if (isLoading) return <CustomLoading />;
  if (error) return <ThemedText>Error: Sorry, something went wrong while getting your data</ThemedText>;

  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1">
          <FlatList
            data={data?.results.flatMap((page) => page)}
            renderItem={({ item }) => <ProductCard product={item} />}
            keyExtractor={(item) => item.id}
            onEndReached={() => loadMore()}
            onEndReachedThreshold={0.5}
            ListFooterComponent={<>{isFetching && <CustomLoading />}</>}
          />
        </View>
      </SafeAreaView>
    </ThemedView>
  );
};

const CustomLoading = () => {
  return (
    <View className="items-center justify-center">
      <ThemedText className="p-2 text-center">Loading...</ThemedText>
      <GreenSpinner />
    </View>
  );
};

const InfiniteQueryDebugControls = () => {
  const dispatch = useAppDispatch();
  return (
    <>
      <PrimaryButton
        title="test tag"
        handlePress={() => {
          dispatch(
            apiSlice.util.invalidateTags([
              { type: "UserImageAnalysis", id: "LIST" },
              { type: "RecentUserImageAnalysis", id: "LIST" },
            ]),
          );
        }}
      />
      <PrimaryButton
        title="test delete"
        handlePress={() => {
          dispatch(
            apiSliceWithProducts.util.updateQueryData("getAllUserProducts", 1, (draft) => {
              return { ...draft, reset: true, results: [], page: 0 };
            }),
          );
        }}
      />
      <PrimaryButton
        title="test update"
        handlePress={() => {
          dispatch(productUploadComplete({ uuid: "1" }));
        }}
      />
    </>
  );
};

export default HomeScreen;
