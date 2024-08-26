import { StyleSheet, useColorScheme, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

type Props = {};

const SplashScreenPlain = (props: Props) => {
  const theme = useColorScheme() ?? "dark";
  return (
    <View
      className="flex-1"
      style={{ backgroundColor: Colors[theme].background }}
    />
  );
};

export default SplashScreenPlain;

const styles = StyleSheet.create({});
