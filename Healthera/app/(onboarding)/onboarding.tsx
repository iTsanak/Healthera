import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";

type Props = {};

const Onboarding = (props: Props) => {
  return (
    <ThemedView style={{ flex: 1, justifyContent: "center" }}>
      <Text>Onboarding</Text>
      <ThemedView
        style={{ width: "auto", height: 50, backgroundColor: "#00880050" }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            router.back();
          }}
        >
          <ThemedText>Go back</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
};

export default Onboarding;
