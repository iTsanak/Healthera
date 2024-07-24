import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import { useSession } from "@/providers/session-provider";

type Props = {};

const SignIn = (props: Props) => {
  const { signIn } = useSession();
  return (
    <ThemedView style={{ flex: 1, justifyContent: "center" }}>
      <ThemedText>SignIn</ThemedText>
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
      <ThemedView
        style={{ width: "auto", height: 50, backgroundColor: "#00880050" }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            signIn();
            router.dismissAll();
            router.replace("/");
          }}
        >
          <ThemedText>Fake sign in</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
};

export default SignIn;
