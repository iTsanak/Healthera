import { View, TouchableOpacity, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";

import { ThemedText } from "../ThemedText";
import Avatar from "../Profile/avatar";

import { Colors } from "@/constants/Colors";

import { useAppSelector } from "@/redux/redux-hooks";
import { selectNewNotificationsCount } from "@/redux/notifications/notifications-slice";

type Props = {
  username: string;
};

const AvatarTopNavBar = ({ username }: Props) => {
  const theme = useColorScheme() ?? "light";
  const newNotificationCount = useAppSelector(selectNewNotificationsCount);

  return (
    <View className="w-full flex-row items-center px-2">
      <TouchableOpacity
        className="mr-4 rounded-full"
        onPress={() => {
          router.back();
        }}
      >
        <Avatar size={52} />
      </TouchableOpacity>

      <View className="flex-1 flex-col">
        <ThemedText style={{ color: Colors[theme].accent }}>Hi, Welcome back!</ThemedText>
        <ThemedText style={{ color: Colors[theme].text }}>{username}</ThemedText>
      </View>

      <TouchableOpacity
        style={{ backgroundColor: Colors[theme].accent }}
        className="relative rounded-full p-1"
        onPress={() => {
          router.push("/(app)/(notifications)/notifications");
        }}
      >
        <Ionicons name="notifications-outline" size={26} />
        {newNotificationCount > 0 && (
          <View className="absolute right-0 top-0 h-4 w-4 items-center justify-center rounded-full bg-red-600">
            <ThemedText className="text-xs">{newNotificationCount > 9 ? "+9" : newNotificationCount}</ThemedText>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: Colors[theme].accent }}
        className="ml-2 rounded-full p-1"
        onPress={() => {
          router.navigate("/settings");
        }}
      >
        <Ionicons name="settings-outline" size={26} />
      </TouchableOpacity>
    </View>
  );
};

export default AvatarTopNavBar;
