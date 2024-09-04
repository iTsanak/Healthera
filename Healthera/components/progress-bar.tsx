import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface CircularProgressBarProps {
  percentage: number;
  size: number;
  strokeWidth: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  percentage,
  size,
  strokeWidth,
}) => {
  const animatedValue = useSharedValue(0);

  React.useEffect(() => {
    animatedValue.value = withTiming(percentage, {
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
    });
  }, [percentage]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset:
      circumference - (circumference * animatedValue.value) / 100,
  }));

  let color1 = "#adfc02";
  let color2 = "#13fc02";

  if (percentage < 35) {
    color1 = "#fc0202";
    color2 = "#fc8302";
  } else if (percentage < 66) {
    color1 = "#fcc602";
    color2 = "#dbfc02";
  }

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            {}
            <Stop offset="100%" stopColor={color1} stopOpacity="1" />
            <Stop offset="0%" stopColor={color2} stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Circle
          stroke="#e6e6e6"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* <Circle
          stroke="#e6e6e6"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius * 0.8}
          strokeWidth={strokeWidth * 0.8}
        />
        <Circle
          stroke="#e6e6e6"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius * 0.6}
          strokeWidth={strokeWidth * 0.6}
        />
        <Circle
          stroke="#e6e6e6"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius * 0.4}
          strokeWidth={strokeWidth * 0.4}
        />
        <Circle
          stroke="#e6e6e6"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius * 0.2}
          strokeWidth={strokeWidth * 0.2}
        /> */}
        <AnimatedCircle
          stroke="url(#grad)"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          animatedProps={animatedProps}
          strokeLinecap="round"
        />
        {/* <AnimatedCircle
          stroke="url(#grad)"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius * 0.8}
          strokeWidth={strokeWidth * 0.8}
          strokeDasharray={`${circumference} ${circumference}`}
          animatedProps={animatedProps}
          strokeLinecap="round"
        />
        <AnimatedCircle
          stroke="url(#grad)"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius * 0.6}
          strokeWidth={strokeWidth * 0.6}
          strokeDasharray={`${circumference} ${circumference}`}
          animatedProps={animatedProps}
          strokeLinecap="round"
        />
        <AnimatedCircle
          stroke="url(#grad)"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius * 0.4}
          strokeWidth={strokeWidth * 0.4}
          strokeDasharray={`${circumference} ${circumference}`}
          animatedProps={animatedProps}
          strokeLinecap="round"
        />
        <AnimatedCircle
          stroke="url(#grad)"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius * 0.2}
          strokeWidth={strokeWidth * 0.2}
          strokeDasharray={`${circumference} ${circumference}`}
          animatedProps={animatedProps}
          strokeLinecap="round"
        /> */}
      </Svg>
    </View>
  );
};

export default CircularProgressBar;
