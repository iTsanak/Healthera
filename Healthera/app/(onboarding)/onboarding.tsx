import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";

type Props = {};

const Onboarding = (props: Props) => {
  return (
    <ThemedView style={{ flex: 1, justifyContent: "center", rowGap: 10 }}>
      <ThemedText>Onboarding</ThemedText>
      <ThemedView
        style={{ width: "auto", height: 50, backgroundColor: "#00880050" }}
      >
        <TouchableOpacity
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          onPress={() => {
            console.log("pressed");
            router.back();
          }}
        >
          <ThemedText>Go back</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <ThemedView
        style={{ width: "auto", height: 50, backgroundColor: "#00880070" }}
      >
        <TouchableOpacity
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          onPress={() => {
            console.log("pressed");
            router.push("/sign-in");
          }}
        >
          <ThemedText>Sign In</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <ThemedView
        style={{ width: "auto", height: 50, backgroundColor: "#00880050" }}
      >
        <TouchableOpacity
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          onPress={() => {
            console.log("pressed");
            router.push("/sign-up");
          }}
        >
          <ThemedText>Sign Up</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
};

export default Onboarding;
