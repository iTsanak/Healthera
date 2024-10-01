import React, { memo } from "react";
import { View, StyleSheet, useColorScheme, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { format } from "date-fns";

import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { ProductsListResultsType } from "@/API-types/user-products-list";
import PendingProductCard from "./pending-product-card";

const getGradientColors = (score: number) => {
  if (score < 40) return ["#FF4136", "#FF851B"];
  if (score < 70) return ["#FF851B", "#FFDC00"];
  return ["#FFDC00", "#2ECC40"];
};

const CompletedProductCard = ({ product }: { product: ProductsListResultsType }) => {
  const theme = useColorScheme() ?? "dark";
  const overallScore = product.result.overall_score;
  const gradientColors = getGradientColors(overallScore);

  return (
    <View style={[styles.card, { backgroundColor: Colors[theme].cardBackground }]}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="image-search-outline" size={24} color={Colors[theme].accent} />
        <ThemedText style={styles.title} numberOfLines={1}>
          ID: {product.id}
        </ThemedText>
      </View>

      <View style={styles.scoreContainer}>
        <LinearGradient
          colors={gradientColors}
          start={[0, 0]}
          end={[1, 0]}
          style={[styles.scoreBar, { width: `${overallScore}%` }]}
        />
        <View style={styles.scoreTextContainer}>
          <ThemedText style={[styles.scoreText, { color: Colors[theme].text }]}>{overallScore}</ThemedText>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <ThemedText style={styles.infoText}>
          Status: <ThemedText style={styles.infoHighlight}>{product.status}</ThemedText>
        </ThemedText>
        <ThemedText style={styles.infoText}>{format(new Date(product.created_at), "MMM d, yyyy")}</ThemedText>
      </View>

      {!!product.result.additional_notes && (
        <ThemedText style={styles.notes} numberOfLines={2}>
          {product.result.additional_notes}
        </ThemedText>
      )}
    </View>
  );
};

const FailedProductCard = ({ product }: { product: ProductsListResultsType }) => {
  const theme = useColorScheme() ?? "dark";
  return (
    <View style={[styles.card, styles.failedCard, { backgroundColor: Colors[theme].cardBackground }]}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="alert-circle-outline" size={24} color={Colors[theme].text} />
        <ThemedText style={[styles.title, { color: Colors[theme].text }]} numberOfLines={1}>
          ID: {product.id}
        </ThemedText>
      </View>

      <View style={styles.failedInfoContainer}>
        <ThemedText style={[styles.infoText, { color: Colors[theme].text }]}>
          Status: <ThemedText style={[styles.infoHighlight, { color: Colors[theme].text }]}>Failed</ThemedText>
        </ThemedText>
        <ThemedText style={[styles.infoText, { color: Colors[theme].text }]}>
          {format(new Date(product.created_at), "MMM d, yyyy")}
        </ThemedText>
      </View>

      <ThemedText style={[styles.notes, { color: Colors[theme].text }]} numberOfLines={2}>
        An error occurred while processing this request. Please try again later.
      </ThemedText>
    </View>
  );
};

// const PendingProductCard = () => {
//   const theme = useColorScheme() ?? "dark";
//   return (
//     <View style={[styles.card, { backgroundColor: Colors[theme].cardBackground }]}>
//       <View style={styles.header}>
//         <View style={[styles.skeleton, styles.icon]} />
//         <View style={[styles.skeleton, styles.title]} />
//       </View>

//       <View style={[styles.skeleton, styles.scoreContainer]} />

//       <View style={styles.infoContainer}>
//         <View style={[styles.skeleton, styles.infoText]} />
//         <View style={[styles.skeleton, styles.infoText]} />
//       </View>

//       <View style={[styles.skeleton, styles.notes]} />
//     </View>
//   );
// };

const ProductCard = memo(({ product }: { product: ProductsListResultsType }) => {
  const handlePress = () => {
    if (product.status === "completed") {
      router.push({
        pathname: "/product-info",
        params: { result: JSON.stringify(product.result) },
      });
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.cardWrapper}>
      {product.status === "completed" && <CompletedProductCard product={product} />}
      {product.status === "failed" && <FailedProductCard product={product} />}
      {product.status === "pending" && <PendingProductCard />}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  cardWrapper: {
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  card: {
    borderRadius: 12,
    padding: 16,
  },
  failedCard: {
    borderWidth: 1,
    borderColor: "rgba(255, 0, 0, 0.3)",
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
  scoreTextContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 8,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  failedInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    backgroundColor: "rgba(255, 0, 0, 0.1)",
    padding: 8,
    borderRadius: 6,
  },
  infoText: {
    fontSize: 14,
    opacity: 0.8,
  },
  infoHighlight: {
    fontWeight: "bold",
    opacity: 1,
  },
  notes: {
    fontSize: 14,
    opacity: 0.9,
    fontStyle: "italic",
    marginTop: 4,
  },
  skeleton: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 4,
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  // Add more skeleton styles as needed
});

export default ProductCard;
