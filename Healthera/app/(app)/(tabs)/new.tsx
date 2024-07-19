import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

type Props = {};

const NewScreen = (props: Props) => {
  return (
    <ThemedView style={{ flex: 1, justifyContent: "center" }}>
      <Text>NewScreen</Text>
      <ThemedView
        style={{ width: "auto", height: 50, backgroundColor: "#00880050" }}
      >
        <TouchableOpacity style={{ flex: 1 }}>
          <ThemedText>Welcome!</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
};

export default NewScreen;
