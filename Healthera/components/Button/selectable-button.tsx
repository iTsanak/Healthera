import React from "react";
import { Pressable, TouchableOpacity, useColorScheme, View, ViewProps } from "react-native";
import { ThemedText, ThemedTextProps } from "../ThemedText";
import { Colors } from "@/constants/Colors";

export type SelectableButtonProps = {
  title: string;
  handlePress: () => void;
  isLoading?: boolean;
  style?: ViewProps["style"];
  className?: ViewProps["className"];
  titleClassName?: ThemedTextProps["className"];
  minHeight?: number;
  isSelected?: boolean;
};

const SelectableButton = ({
  title,
  handlePress,
  isLoading,
  style,
  titleClassName,
  minHeight,
  isSelected,
  className, // IGNORE
}: SelectableButtonProps) => {
  const theme = useColorScheme() ?? "dark";
  return (
    <View style={[{ minHeight: minHeight ?? 10 }, style]} className={`overflow-hidden rounded-3xl`}>
      <TouchableOpacity
        onPress={handlePress}
        style={{
          backgroundColor: isSelected ? Colors[theme].primary : Colors[theme].secondary,
        }}
        className={`flex-1 items-center justify-center ${isLoading ? "opacity-50" : ""}`}
        disabled={isLoading}
      >
        <ThemedText
          style={{
            color: isSelected ? Colors[theme].text : Colors[theme].background,
          }}
          className={`${titleClassName ?? "text-xl font-bold"}`}
        >
          {title}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};

export default SelectableButton;
