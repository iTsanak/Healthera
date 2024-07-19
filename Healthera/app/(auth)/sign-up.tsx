import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";

type Props = {};

const SignUp = (props: Props) => {
  return (
    <ThemedView style={{ flex: 1, justifyContent: "center" }}>
      <ThemedText>SignUp</ThemedText>
      <ThemedView className="h-40 w-full bg-green-500">
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

export default SignUp;
