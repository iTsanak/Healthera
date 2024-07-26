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
import CircularProgressBar from "@/components/progress-bar";

type Props = {};

const ProductsScreen = (props: Props) => {
  const theme = useColorScheme() ?? "dark";
  const [sortOrder, setSortOrder] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const healthScore = Math.floor(Math.random() * (100 - 0 + 1));

  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center">
          <SimpleTopNavBar title="Product Info" />
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
                <View className="h-52 w-44 items-center justify-center">
                  <CircularProgressBar
                    percentage={healthScore}
                    size={160}
                    strokeWidth={10}
                  />
                </View>
                <ThemedText className="mb-4 text-4xl font-bold">
                  {healthScore}/100
                </ThemedText>
                <View
                  style={{ backgroundColor: Colors[theme].secondary }}
                  className="rounded-3xl p-2 px-4"
                >
                  <ThemedText style={{ color: Colors[theme].background }}>
                    This product is healthy enough
                  </ThemedText>
                </View>
              </View>

              <View className="mt-10">
                <ThemedText style={{ color: Colors[theme].accent }}>
                  Ingredient 1
                </ThemedText>
                <ThemedText className="text-sm">
                  Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
                  ridiculus magna lacinia convallis egestas. Magna libero
                  conubia duis vitae maximus imperdiet senectus. Praesent semper
                  platea porta aenean nam. Suscipit molestie condimentum rhoncus
                  parturient elit nec magnis sollicitudin. Proin id aliquet
                  augue pretium libero amet phasellus maecenas! Euismod purus
                  platea natoque augue interdum duis diam sit. Porttitor sapien
                  sem fusce quam natoque lacus quam nostra.
                </ThemedText>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
};
export default ProductsScreen;
