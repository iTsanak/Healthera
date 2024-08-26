import { View, ScrollView, useColorScheme } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ThemedView";
import SimpleTopNavBar from "@/components/Navigation/simple-top-navbar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";

type Props = {};

const PrivacyPoliceScreen = (props: Props) => {
  const theme = useColorScheme() ?? "dark";
  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="flex-1 items-center">
          <SimpleTopNavBar title="Privacy Policy" />
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="w-full"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ alignItems: "center" }}
          >
            <View className="mt-10" />
            <View className="w-[85%] gap-y-4">
              <ThemedText style={{ color: Colors[theme].accent }}>
                Last Updated: DD/MM/YYYY
              </ThemedText>
              <ThemedText className="text-sm">
                Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
                ridiculus magna lacinia convallis egestas. Magna libero conubia
                duis vitae maximus imperdiet senectus. Praesent semper platea
                porta aenean nam. Suscipit molestie condimentum rhoncus
                parturient elit nec magnis sollicitudin. Proin id aliquet augue
                pretium libero amet phasellus maecenas! Euismod purus platea
                natoque augue interdum duis diam sit. Porttitor sapien sem fusce
                quam natoque lacus quam nostra.
              </ThemedText>
              <ThemedText className="text-sm">
                Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
                ridiculus magna lacinia convallis egestas. Magna libero conubia
                duis vitae maximus imperdiet senectus. Praesent semper platea
                porta aenean nam. Suscipit molestie condimentum rhoncus
                parturient elit nec magnis sollicitudin. Proin id aliquet augue
                pretium libero amet phasellus maecenas! Euismod purus platea
                natoque augue interdum duis diam sit. Porttitor sapien sem fusce
                quam natoque lacus quam nostra.
              </ThemedText>

              <ThemedText
                className="text-xl"
                style={{ color: Colors[theme].accent }}
              >
                Terms & Conditions
              </ThemedText>

              <ThemedText className="text-sm">
                Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
                ridiculus magna lacinia convallis egestas. Magna libero conubia
                duis vitae maximus imperdiet senectus. Praesent semper platea
                porta aenean nam. Suscipit molestie condimentum rhoncus
                parturient elit nec magnis sollicitudin. Proin id aliquet augue
                pretium libero amet phasellus maecenas! Euismod purus platea
                natoque augue interdum duis diam sit. Porttitor sapien sem fusce
                quam natoque lacus quam nostra.
              </ThemedText>
              <ThemedText className="text-sm">
                Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
                ridiculus magna lacinia convallis egestas. Magna libero conubia
                duis vitae maximus imperdiet senectus. Praesent semper platea
                porta aenean nam. Suscipit molestie condimentum rhoncus
                parturient elit nec magnis sollicitudin. Proin id aliquet augue
                pretium libero amet phasellus maecenas! Euismod purus platea
                natoque augue interdum duis diam sit. Porttitor sapien sem fusce
                quam natoque lacus quam nostra.
              </ThemedText>
              <ThemedText className="text-sm">
                Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
                ridiculus magna lacinia convallis egestas. Magna libero conubia
                duis vitae maximus imperdiet senectus. Praesent semper platea
                porta aenean nam. Suscipit molestie condimentum rhoncus
                parturient elit nec magnis sollicitudin. Proin id aliquet augue
                pretium libero amet phasellus maecenas! Euismod purus platea
                natoque augue interdum duis diam sit. Porttitor sapien sem fusce
                quam natoque lacus quam nostra.
              </ThemedText>
              <ThemedText className="text-sm">
                Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
                ridiculus magna lacinia convallis egestas. Magna libero conubia
                duis vitae maximus imperdiet senectus. Praesent semper platea
                porta aenean nam. Suscipit molestie condimentum rhoncus
                parturient elit nec magnis sollicitudin. Proin id aliquet augue
                pretium libero amet phasellus maecenas! Euismod purus platea
                natoque augue interdum duis diam sit. Porttitor sapien sem fusce
                quam natoque lacus quam nostra.
              </ThemedText>
              <ThemedText className="text-sm">
                Lorem ipsum odor amet, consectetuer adipiscing elit. Aptent ut
                ridiculus magna lacinia convallis egestas. Magna libero conubia
                duis vitae maximus imperdiet senectus. Praesent semper platea
                porta aenean nam. Suscipit molestie condimentum rhoncus
                parturient elit nec magnis sollicitudin. Proin id aliquet augue
                pretium libero amet phasellus maecenas! Euismod purus platea
                natoque augue interdum duis diam sit. Porttitor sapien sem fusce
                quam natoque lacus quam nostra.
              </ThemedText>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
};
export default PrivacyPoliceScreen;
