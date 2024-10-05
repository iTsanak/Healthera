import { Animated, StyleSheet, useColorScheme, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";

import { Colors } from "@/constants/Colors";

const Shimmer = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ).start();
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-800, 400], // Adjust to control shimmer effect distance
  });

  return (
    <View style={StyleSheet.absoluteFill} className="overflow-hidden">
      <Animated.View style={[styles.shimmerOverlay, { transform: [{ translateX }] }]}>
        <LinearGradient
          colors={["rgba(255,255,255,0.1)", "rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.gradient}
        />
      </Animated.View>
    </View>
  );
};

const PendingProductCard = () => {
  const theme = useColorScheme() ?? "dark";
  return (
    <View style={[styles.card, { backgroundColor: Colors[theme].cardBackground }]}>
      <View style={styles.header}>
        <View style={[styles.skeleton, styles.icon]} className="overflow-hidden">
          <Shimmer />
        </View>
        <View style={[styles.skeleton, styles.title]} className="overflow-hidden">
          <Shimmer />
        </View>
      </View>

      <View style={[styles.skeleton, styles.scoreContainer]} className="overflow-hidden">
        <Shimmer />
      </View>

      <View style={styles.infoContainer}>
        <View style={[styles.skeleton, styles.infoText]} className="overflow-hidden">
          <Shimmer />
        </View>
        <View style={[styles.skeleton, styles.infoText]} className="overflow-hidden">
          <Shimmer />
        </View>
      </View>

      <View style={[styles.skeleton, styles.notes]} className="overflow-hidden">
        <Shimmer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    width: 150,
    height: 16,
    marginLeft: 8,
    borderRadius: 4,
  },
  scoreContainer: {
    height: 24,
    borderRadius: 12,
    marginBottom: 12,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoText: {
    width: 80,
    height: 16,
    borderRadius: 4,
  },
  notes: {
    width: "100%",
    height: 14,
    borderRadius: 4,
  },
  skeleton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 4,
    position: "relative",
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  shimmerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
  gradient: {
    width: "200%",
    height: "100%",
  },
});

export default PendingProductCard;
