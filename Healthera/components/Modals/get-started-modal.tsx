import { Modal, View, useColorScheme, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { Colors } from "@/constants/Colors";

import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import PrimaryButton from "../Button/primary-button";

export default function GetStartedModal({
  isVisible,
  onClose,
}: Readonly<{
  isVisible: boolean;
  onClose: () => void;
}>) {
  return (
    <Modal animationType="slide" transparent={false} visible={isVisible} onRequestClose={onClose}>
      <ThemedView className="flex-1">
        <SafeAreaView className="flex-1">
          <View className="flex-1 items-center">
            <CloseButton onClose={onClose} />
            <MainContent onClose={onClose} />
          </View>
        </SafeAreaView>
      </ThemedView>
    </Modal>
  );
}

const CloseButton = ({ onClose }: { onClose: () => void }) => {
  const theme = useColorScheme() ?? "light";
  return (
    <View className="mt-10 w-[80%] items-end">
      <TouchableOpacity className="p-2" onPress={onClose}>
        <MaterialIcons name="close" size={25} color={Colors[theme].text} />
      </TouchableOpacity>
    </View>
  );
};

const MainContent = ({ onClose }: { onClose: () => void }) => (
  <View className="mt-10 w-[80%] items-center">
    <ThemedText className="mb-5 text-3xl font-bold">Lets Get Started!</ThemedText>
    <ThemedText className="mb-5 text-lg text-text-light/70 dark:text-text-dark/70">Already have an account?</ThemedText>
    <PrimaryButton
      className="mb-10 w-[80%]"
      handlePress={() => {
        router.push("/sign-in");
        onClose();
      }}
      title="Login"
    />
    <ThemedText className="mb-5 text-lg text-text-light/70 dark:text-text-dark/70">New to Healthera?</ThemedText>
    <PrimaryButton
      className="mb-10 w-[80%]"
      handlePress={() => {
        router.push("/sign-up");
        onClose();
      }}
      title="Create account"
    />
  </View>
);
