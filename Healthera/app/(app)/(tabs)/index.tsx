import { View, ScrollView, useColorScheme, Pressable } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import LogoutModal from "@/components/Modal/logout";
import AvatarTopNavBar from "@/components/Navigation/avatar-top-navbar";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";

type Props = {};

const HomeScreen = (props: Props) => {
  const theme = useColorScheme() ?? "dark";
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center">
          <AvatarTopNavBar username="John Doe" />
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="w-full"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ alignItems: "center" }}
          >
            <View className="mb-20 w-[80%] gap-y-4">
              <Pressable
                className="h-16 w-full items-center justify-center bg-accent-light/70"
                onPress={() => {
                  router.push("");
                }}
              >
                <ThemedText>Go to Products</ThemedText>
              </Pressable>
              <Pressable
                className="h-16 w-full items-center justify-center bg-accent-light/70"
                onPress={() => {
                  router.push("");
                }}
              >
                <ThemedText>Go to Product Info</ThemedText>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>

      <LogoutModal
        isVisible={isLogoutModalOpen}
        onClose={() => {
          setIsLogoutModalOpen(false);
        }}
      />
    </ThemedView>
  );
};
export default HomeScreen;
