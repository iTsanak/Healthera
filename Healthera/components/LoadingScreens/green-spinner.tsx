import { ActivityIndicator, View, StyleSheet, useColorScheme } from "react-native";
import React from "react";

import { Colors } from "@/constants/Colors";

const GreenSpinner = () => {
  const theme = useColorScheme() ?? "dark";
  return (
    <View style={[{ ...styles.spinnerContainer, backgroundColor: Colors[theme].background }]}>
      <ActivityIndicator size="large" color="#00FF00" />
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 100, // Circle width
    height: 100, // Circle height
    borderRadius: 50, // Make it a circle
  },
});

export default GreenSpinner;
