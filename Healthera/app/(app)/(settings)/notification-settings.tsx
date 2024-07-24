import { View, ScrollView, useColorScheme, Switch } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import SimpleTopNavBar from "@/components/Navigation/simple-top-navbar";
import IconTitleArrow from "@/components/SpecialButtons/icon-title-arrow";
import { SafeAreaView } from "react-native-safe-area-context";
import TitleSwitchButton from "@/components/SpecialButtons/title-switchButton";

type Props = {};

const NotificationSettingsScreen = (props: Props) => {
  const theme = useColorScheme() ?? "dark";

  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center">
          <SimpleTopNavBar title="Notification Settings" />
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="w-full"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ alignItems: "center" }}
          >
            <View className="mt-10" />
            <View className="mb-20 w-[80%] gap-y-5">
              <TitleSwitchButton
                isActive={true}
                title="General Notifications"
                handleOnPress={(value: boolean) => {
                  console.log("Current value is", value);
                }}
              />
              <TitleSwitchButton
                isActive={true}
                title="Sound"
                handleOnPress={(value: boolean) => {
                  console.log("Current value is", value);
                }}
              />
              <TitleSwitchButton
                isActive={true}
                title="Sound Call"
                handleOnPress={(value: boolean) => {
                  console.log("Current value is", value);
                }}
              />
              <TitleSwitchButton
                isActive={false}
                title="Vibrate"
                handleOnPress={(value: boolean) => {
                  console.log("Current value is", value);
                }}
              />
              <TitleSwitchButton
                isActive={true}
                title="Special Offers"
                handleOnPress={(value: boolean) => {
                  console.log("Current value is", value);
                }}
              />
              <TitleSwitchButton
                isActive={false}
                title="Payments"
                handleOnPress={(value: boolean) => {
                  console.log("Current value is", value);
                }}
              />
              <TitleSwitchButton
                isActive={true}
                title="Promo And Discount"
                handleOnPress={(value: boolean) => {
                  console.log("Current value is", value);
                }}
              />
              <TitleSwitchButton
                isActive={false}
                title="Cashback"
                handleOnPress={(value: boolean) => {
                  console.log("Current value is", value);
                }}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
};
export default NotificationSettingsScreen;
