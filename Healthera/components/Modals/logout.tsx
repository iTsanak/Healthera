import { Modal, Pressable, View, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import PrimaryButton from "../Button/primary-button";
import { Colors } from "@/constants/Colors";
import { useSession } from "@/providers/session-provider";
import { router } from "expo-router";

export default function LogoutModal({
  isVisible,
  onClose,
}: Readonly<{
  isVisible: boolean;
  onClose: () => void;
}>) {
  const theme = useColorScheme() ?? "light";
  const { logout } = useSession();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <SafeAreaView
        style={{ backgroundColor: Colors[theme].text + "50" }}
        className="flex-1"
      >
        <Pressable
          className="flex-1 justify-end"
          onPress={() => {
            onClose();
          }}
        >
          <ThemedView className="w-full items-center rounded-t-3xl pb-8">
            <ThemedText
              style={{ color: Colors[theme].accent }}
              className="pt-2 text-3xl"
            >
              Logout
            </ThemedText>
            <ThemedText className="p-4">
              are you sure you want to log out?
            </ThemedText>
            <View className="w-full flex-row justify-around">
              <PrimaryButton
                className="w-36"
                title="Cancel"
                handlePress={() => {
                  onClose();
                }}
              />
              <PrimaryButton
                className="w-36"
                title="Yes, Logout"
                handlePress={async () => {
                  await logout();
                  router.replace("/");
                }}
              />
            </View>
          </ThemedView>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
}
