import React from "react";
import { View } from "react-native";

import Animated, { Easing, useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated";

const INDICATOR_SIZE = 12;
const INDICATOR_SPACING = 8;
const SCALE_DURATION = 150;

const CircleIndicator = ({ currentPage }: { currentPage: number }) => {
  const activeIndex = useSharedValue(currentPage - 1);
  const scale = useSharedValue(1.3);

  React.useEffect(() => {
    activeIndex.value = withTiming(currentPage - 1, { duration: 300 });

    scale.value = withSequence(
      withTiming(1, {
        duration: SCALE_DURATION,
        easing: Easing.inOut(Easing.quad),
      }),
      withTiming(1.3, {
        duration: SCALE_DURATION,
        easing: Easing.inOut(Easing.quad),
      }),
    );
  }, [currentPage]);

  const activeBallStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: activeIndex.value * (INDICATOR_SIZE + INDICATOR_SPACING),
        },
        { scale: scale.value },
      ],
    };
  });

  return (
    <View className="items-center">
      <View className="flex-row">
        {[1, 2, 3, 4].map((_, index) => (
          <View
            key={index} // NOSONAR
            style={{
              width: INDICATOR_SIZE,
              height: INDICATOR_SIZE,
              borderRadius: INDICATOR_SIZE / 2,
              backgroundColor: "rgba(209, 213, 219, 0.5)",
              marginRight: index == 3 ? 0 : INDICATOR_SPACING,
            }}
          />
        ))}

        <Animated.View
          style={[
            {
              position: "absolute",
              width: INDICATOR_SIZE,
              height: INDICATOR_SIZE,
              borderRadius: INDICATOR_SIZE / 2,
              backgroundColor: "white",
              left: 0,
            },
            activeBallStyle,
          ]}
        />
      </View>
    </View>
  );
};

export default CircleIndicator;
