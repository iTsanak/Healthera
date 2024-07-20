import React from "react";
import { Pressable, TouchableOpacity, View, ViewProps } from "react-native";
import { ThemedText, ThemedTextProps } from "../ThemedText";

export type PrimaryButtonProps = {
  title: string;
  handlePress: () => void;
  isLoading?: boolean;
  style?: ViewProps["style"];
  className?: ViewProps["className"];
  titleClassName?: ThemedTextProps["className"];
  minHeight?: number;
};

const PrimaryButton = ({
  title,
  handlePress,
  isLoading,
  style,
  titleClassName,
  minHeight,
  className, // IGNORE
}: PrimaryButtonProps) => {
  return (
    <View
      style={[{ minHeight: minHeight ?? 55 }, style]}
      className={`overflow-hidden rounded-3xl`}
    >
      <TouchableOpacity
        onPress={handlePress}
        className={`flex-1 items-center justify-center bg-primary-light dark:bg-primary-dark ${isLoading ? "opacity-50" : ""}`}
        disabled={isLoading}
      >
        <ThemedText
          className={`${titleClassName ?? "text-xl font-bold text-white"}`}
        >
          {title}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};

export default PrimaryButton;
