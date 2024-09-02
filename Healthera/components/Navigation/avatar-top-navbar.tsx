import { View, TouchableOpacity, useColorScheme } from "react-native";
import React from "react";
import { ThemedText } from "../ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";
import Avatar from "../Profile/avatar";

type Props = {
  username: string;
};

const AvatarTopNavBar = ({ username }: Props) => {
  const theme = useColorScheme() ?? "light";

  return (
    <View className="w-full flex-row items-center px-2">
      <TouchableOpacity
        className="mr-4 rounded-full"
        onPress={() => {
          router.back();
        }}
      >
        <Avatar
          imageUri="https://utfs.io/f/e96b95ab-b00a-4801-bcc7-4946f71c11f2-cnxr61.jpeg"
          size={52}
        />
      </TouchableOpacity>

      <View className="flex-1 flex-col">
        <ThemedText style={{ color: Colors[theme].accent }}>
          Hi, Welcome back!
        </ThemedText>
        <ThemedText style={{ color: Colors[theme].text }}>
          {username}
        </ThemedText>
      </View>

      <TouchableOpacity
        style={{ backgroundColor: Colors[theme].accent }}
        className="relative rounded-full p-1"
        onPress={() => {
          console.log("pressed");
        }}
      >
        <Ionicons name="notifications-outline" size={26} />
        <View className="absolute right-0 top-0 h-3 w-3 rounded-full bg-red-600" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: Colors[theme].accent }}
        className="ml-2 rounded-full p-1"
        onPress={() => {
          console.log("pressed");
        }}
      >
        <Ionicons name="settings-outline" size={26} />
      </TouchableOpacity>
    </View>
  );
};

export default AvatarTopNavBar;
