import { View, ScrollView, useColorScheme } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import SimpleTopNavBar from "@/components/Navigation/simple-top-navbar";
import IconTitleArrow from "@/components/SpecialButtons/icon-title-arrow";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

type Props = {};

const SettingsScreen = (props: Props) => {
  const theme = useColorScheme() ?? "dark";
  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center">
          <SimpleTopNavBar title="Settings" />
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="w-full"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ alignItems: "center" }}
          >
            <View className="mt-10" />
            <View className="mb-20 w-[80%] gap-y-5">
              <IconTitleArrow
                title="Notifications Settings"
                icon="bulb-outline"
                handleOnPress={() => {
                  console.log("pressed");
                  router.push("/notification-settings");
                }}
              />
              <IconTitleArrow
                title="Password Manager"
                icon="key-outline"
                handleOnPress={() => {
                  console.log("pressed");
                  router.push("/password-manager");
                }}
              />
              <IconTitleArrow
                title="Delete Account"
                icon="person"
                handleOnPress={() => {
                  console.log("pressed");
                }}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
};
export default SettingsScreen;
