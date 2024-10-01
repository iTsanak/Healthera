import { TouchableOpacity, useColorScheme, View, ViewProps } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";

type Props = {
  title: string;
  textContent: string;
  style?: ViewProps;
  icon?: keyof typeof Ionicons.glyphMap;
};

const DropdownItem = ({ title, textContent, style, icon }: Props) => {
  const theme = useColorScheme() ?? "dark";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={style} className="">
      <TouchableOpacity
        className=""
        onPress={() => {
          setIsOpen(!isOpen);
        }}
      >
        <View
          style={{ backgroundColor: Colors[theme].secondary + "20" }}
          className="flex-row items-center justify-center rounded-full"
        >
          {icon && (
            <View
              style={{ backgroundColor: Colors[theme].primary }}
              className="items-center justify-center rounded-full p-2"
            >
              <Ionicons name={icon} size={25} color={Colors[theme].text} />
            </View>
          )}
          <View className="flex-1 pl-2">
            <ThemedText className="text-lg">{title}</ThemedText>
          </View>
          <View className="items-center justify-center rounded-full p-2">
            <Ionicons
              name={isOpen ? "chevron-up-outline" : "chevron-down-outline"}
              size={25}
              color={Colors[theme].text}
            />
          </View>
        </View>

        {isOpen && <ThemedText className="px-4">{textContent}</ThemedText>}
      </TouchableOpacity>
    </View>
  );
};

export default DropdownItem;
