import React from "react";
import {
  View,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format } from "date-fns";
import { router } from "expo-router";
import { ProductsListResultsType } from "@/API/user-products-list";

const getGradientColors = (score: number) => {
  if (score < 40) {
    return ["#FF4136", "#FF851B"]; // Red to Orange
  } else if (score < 70) {
    return ["#FF851B", "#FFDC00"]; // Orange to Yellow
  } else {
    return ["#FFDC00", "#2ECC40"]; // Yellow to Green
  }
};

const ProductCard = ({ item }: { item: ProductsListResultsType }) => {
  const theme = useColorScheme() ?? "dark";

  if (item.status === "failed") return null;

  const { id, result, status, created_at } = item;
  const overallScore = result.overall_score;
  const gradientColors = getGradientColors(overallScore);

  return (
    <TouchableOpacity
      onPress={() => {
        if (status === "completed") {
          router.push({
            pathname: "/product-info",
            params: { result: JSON.stringify(item.result) },
          });
        }
      }}
    >
      <View style={styles.card} className="bg-[#4b88201a] dark:bg-[#a2df771a]">
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="image-search-outline"
            size={24}
            color={Colors[theme].accent}
          />
          <ThemedText style={styles.title}>Image Request ID: {id}</ThemedText>
        </View>
        <View style={styles.scoreContainer}>
          <LinearGradient
            colors={gradientColors}
            start={[0, 0]}
            end={[1, 0]}
            style={[styles.scoreBar, { width: `${overallScore}%` }]}
          />
          <ThemedText style={styles.scoreText}>{overallScore}</ThemedText>
        </View>
        <View style={styles.infoContainer}>
          <ThemedText style={styles.status}>Status: {status}</ThemedText>
        </View>
        <View style={styles.infoContainer}>
          <ThemedText style={styles.date}>
            Created: {format(new Date(created_at), "PPpp")}
          </ThemedText>
        </View>
        <ThemedText style={styles.notes} numberOfLines={2}>
          {result.additional_notes}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
    flex: 1,
  },
  scoreContainer: {
    height: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
  },
  scoreBar: {
    height: "100%",
    borderRadius: 12,
  },
  scoreText: {
    position: "absolute",
    right: 8,
    top: 2,
    fontSize: 14,
    fontWeight: "bold",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    opacity: 0.8,
  },
  date: {
    fontSize: 14,
    opacity: 0.8,
  },
  notes: {
    fontSize: 14,
    opacity: 0.9,
    fontStyle: "italic",
  },
});

export default ProductCard;
