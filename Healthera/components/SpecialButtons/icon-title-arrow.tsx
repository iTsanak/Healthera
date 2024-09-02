import {
  TouchableOpacity,
  useColorScheme,
  View,
  ViewProps,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";

type Props = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  style?: ViewProps;
  handleOnPress: () => void;
};

const IconTitleArrow = ({ icon, title, style, handleOnPress }: Props) => {
  const theme = useColorScheme() ?? "dark";
  return (
    <View style={style} className="">
      <TouchableOpacity
        className="flex-row items-center justify-center"
        onPress={() => {
          handleOnPress();
        }}
      >
        <View
          style={{ backgroundColor: Colors[theme].primary }}
          className="items-center justify-center rounded-full p-2"
        >
          <Ionicons name={icon} size={25} color={Colors[theme].text} />
        </View>
        <View className="flex-1 pl-2">
          <ThemedText className="text-lg">{title}</ThemedText>
        </View>
        <View className="items-center justify-center rounded-full p-2">
          <Ionicons
            name="chevron-forward-outline"
            size={25}
            color={Colors[theme].text}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default IconTitleArrow;
