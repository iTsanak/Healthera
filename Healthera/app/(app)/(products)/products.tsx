import {
  View,
  ScrollView,
  useColorScheme,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoutModal from "@/components/Modal/logout";
import AvatarTopNavBar from "@/components/Navigation/avatar-top-navbar";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import SimpleTopNavBar from "@/components/Navigation/simple-top-navbar";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Props = {};

const ProductsScreen = (props: Props) => {
  const theme = useColorScheme() ?? "dark";
  const [sortOrder, setSortOrder] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center">
          <SimpleTopNavBar title="Products" />
          <View className="w-full flex-row items-center px-4">
            <ThemedText className="mr-1">Sort By</ThemedText>
            <TouchableOpacity
              style={{ backgroundColor: Colors[theme].primary }}
              className="flex-row items-center justify-center rounded-full p-1 px-2"
              onPress={() => {
                setSortOrder(!sortOrder);
              }}
            >
              <ThemedText className="mr-1">A</ThemedText>
              <Ionicons
                name={
                  sortOrder ? "arrow-forward-outline" : "arrow-back-outline"
                }
                size={15}
                color={Colors[theme].text}
              />
              <ThemedText className="ml-1">Z</ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ backgroundColor: Colors[theme].accent }}
              className="ml-2 items-center justify-center rounded-full p-1"
              onPress={() => {
                setIsFavorite(!isFavorite);
              }}
            >
              <Ionicons
                name={isFavorite ? "star" : "star-outline"}
                size={20}
                color={Colors[theme].text}
              />
            </TouchableOpacity>

            <View className="flex-1 items-end justify-center">
              <View className="flex-row">
                <TouchableOpacity
                  style={{ backgroundColor: Colors[theme].accent }}
                  className="items-center justify-center rounded-full p-1"
                  onPress={() => {
                    console.log("pressed");
                  }}
                >
                  <Ionicons
                    name="search-outline"
                    size={20}
                    color={Colors[theme].text}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ backgroundColor: Colors[theme].accent }}
                  className="ml-2 items-center justify-center rounded-full p-1"
                  onPress={() => {
                    console.log("pressed");
                  }}
                >
                  <Ionicons
                    name="filter"
                    size={20}
                    color={Colors[theme].text}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            className="w-full"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ alignItems: "center" }}
          >
            <View className="mb-20 w-[85%] pt-10">
              <View
                style={{ backgroundColor: Colors[theme].primary }}
                className="items-center justify-center rounded-3xl p-4 py-8"
              >
                <ThemedText className="mb-4 text-lg font-bold">
                  Upload picture of the ingredients
                </ThemedText>
                <ThemedText className="mb-4">Scan items</ThemedText>
                <TouchableOpacity
                  style={{ backgroundColor: Colors[theme].secondary }}
                  className="rounded-3xl p-2 px-4"
                >
                  <ThemedText style={{ color: Colors[theme].background }}>
                    Upload
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
};
export default ProductsScreen;
