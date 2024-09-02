import { View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import AvatarTopNavBar from "@/components/Navigation/avatar-top-navbar";
import { ThemedText } from "@/components/ThemedText";
import { useSession } from "@/providers/session-provider";
import { useAPI } from "@/providers/api-provider";
import { useInfiniteQuery } from "@tanstack/react-query";
import ProductCard from "@/components/Product/product-card";
import {
  USER_PRODUCTS_LIST_ENDPOINT,
  UserProductsListResponseData,
} from "@/API/user-products-list";
import { useAnalysis } from "@/providers/analysis-provider";

type Props = {};

const HomeScreen = (props: Props) => {
  const { user } = useSession();
  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center">
          <AvatarTopNavBar
            username={`${user?.first_name} ${user?.last_name}`}
          />
          <PastProductsList />
        </View>
      </SafeAreaView>
    </ThemedView>
  );
};

const PastProductsList = () => {
  const { api } = useAPI();
  const { status: analysisStatus } = useAnalysis();
  const fetchProjects = async ({ pageParam }: { pageParam: number }) => {
    const res: UserProductsListResponseData = await api
      .get(USER_PRODUCTS_LIST_ENDPOINT(pageParam))
      .then((res) => res.data);
    return res;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.next,
  });

  useEffect(() => {
    if (analysisStatus === "completed") {
      refetch();
    }
  }, [analysisStatus]);

  if (status === "pending" || status === "error") {
    return (
      <ThemedView className="flex-1 items-center justify-center">
        <ThemedText>
          {status === "pending" ? "Loading..." : `Error: ${error?.message}`}
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1">
          <FlatList
            data={data.pages.flatMap((page) => page.results)}
            renderItem={({ item }) => <ProductCard item={item} />}
            keyExtractor={(item) => item.id}
            onEndReached={() => hasNextPage && fetchNextPage()}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              <>
                <ThemedText className="p-2 text-center">
                  {isFetchingNextPage
                    ? "Loading more..."
                    : hasNextPage
                      ? "Load More"
                      : "Nothing more to load"}
                </ThemedText>
                {isFetching && !isFetchingNextPage && (
                  <ThemedText className="p-2 text-center">
                    Fetching...
                  </ThemedText>
                )}
              </>
            }
          />
        </View>
      </SafeAreaView>
    </ThemedView>
  );
};

export default HomeScreen;
