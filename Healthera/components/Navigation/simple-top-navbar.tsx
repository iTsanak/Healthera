import { View, TouchableOpacity, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";

import { ThemedText } from "../ThemedText";

import { Colors } from "@/constants/Colors";

type Props = {
  title: string;
  customBackAction?: () => void;
};

const SimpleTopNavBar = ({
  title,
  customBackAction = () => {
    router.back();
  },
}: Props) => {
  const theme = useColorScheme() ?? "light";

  return (
    <View className="relative w-full flex-row items-center px-2 py-3">
      <TouchableOpacity className="z-50 place-self-start rounded-full p-2" onPress={customBackAction}>
        <Ionicons name="chevron-back" size={30} color={Colors[theme].text} />
      </TouchableOpacity>
      <View className="absolute left-0 right-0">
        <ThemedText className="flex-1 text-center text-2xl">{title}</ThemedText>
      </View>
    </View>
  );
};

export default SimpleTopNavBar;
