import React from "react";
import { View, StyleSheet, useColorScheme } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  GeminiJsonType,
  IngredientJsonType,
} from "@/providers/analysis-provider";

const getGradientColors = (score: number) => {
  if (score < 40) {
    return ["#FF4136", "#FF851B"]; // Red to Orange
  } else if (score < 70) {
    return ["#FF851B", "#FFDC00"]; // Orange to Yellow
  } else {
    return ["#FFDC00", "#2ECC40"]; // Yellow to Green
  }
};

const IngredientCard = ({ ingredient }: { ingredient: IngredientJsonType }) => {
  const theme = useColorScheme() ?? "dark";
  const [name, score, description] = ingredient;
  const scoreNumber = score;

  const gradientColors = getGradientColors(scoreNumber);

  return (
    <View style={styles.card} className="bg-[#4b88201a] dark:bg-[#a2df771a]">
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="food-apple-outline"
          size={24}
          color={Colors[theme].accent}
        />
        <ThemedText style={styles.name}>{name}</ThemedText>
      </View>
      <View style={styles.scoreContainer}>
        <LinearGradient
          colors={gradientColors}
          start={[0, 0]}
          end={[1, 0]}
          style={[styles.scoreBar, { width: `${scoreNumber}%` }]}
        />
        <ThemedText style={styles.scoreText}>{score}</ThemedText>
      </View>
      <ThemedText style={styles.description}>{description}</ThemedText>
    </View>
  );
};

const IngredientsMap = ({ result }: { result: GeminiJsonType }) => {
  return (
    <View style={styles.container}>
      {result?.ingredients.map((ingredient, index) => (
        <IngredientCard key={index} ingredient={ingredient} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  card: {
    // backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 8,
  },
  scoreContainer: {
    height: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 8,
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
  description: {
    fontSize: 14,
    opacity: 0.8,
  },
});

export default IngredientsMap;
