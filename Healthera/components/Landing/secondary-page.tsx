import { Dimensions, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgProps } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";

import { ThemedText } from "@/components/ThemedText";

const { width, height } = Dimensions.get("window");

const SecondaryPageTemplate = ({ Svg }: { Svg: React.FC<SvgProps> }) => {
  return (
    <View className="flex-1">
      <LinearGradient
        colors={["rgba(147, 249, 185,1)", "rgba(29, 151, 108,1)"]}
        locations={[0, 1]}
        start={[0, 0.5]}
        className="flex-1"
      >
        <SafeAreaView className="flex-1">
          <View className="flex-1 items-center justify-end">
            <View className="mb-[10%] w-[80%] items-center justify-end">
              <View className="bg-transparent">
                <Svg
                  width={width * 0.8}
                  height={height * 0.4}
                  className="mb-10"
                />
              </View>

              <ThemedText className="mb-5 text-6xl font-bold text-white">
                Hello!
              </ThemedText>
              <ThemedText className="mb-36 text-xl text-white">
                Let's improve your life style
              </ThemedText>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default SecondaryPageTemplate;
