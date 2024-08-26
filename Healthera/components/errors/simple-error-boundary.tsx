import { View } from "react-native";
import { type ErrorBoundaryProps } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import PrimaryButton from "../Button/primary-button";

const ErrorBoundary = ({ error, retry }: ErrorBoundaryProps) => {
  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center justify-center gap-y-6">
          <ThemedText className="text-xl">Something went wrong</ThemedText>
          <ThemedText>Error: </ThemedText>
          <ThemedText>{error.message}</ThemedText>
          <PrimaryButton
            title="Try quick reload"
            handlePress={() => {
              console.log("[ErrorBoundary]: Recovering from crash");
              retry();
            }}
          />
        </View>
      </SafeAreaView>
    </ThemedView>
  );
};

export default ErrorBoundary;
