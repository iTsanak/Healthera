import { SafeAreaView } from "react-native-safe-area-context";
import { View, ScrollView, Dimensions } from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import React, { useMemo } from "react";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { useGetRecentUserProductsQuery } from "@/redux/products/products-slice";

const UNHEALTHY_THRESHOLD = 40;
const NORMAL_THRESHOLD = 70;
const MAX_INGREDIENTS_TO_DISPLAY = 5;

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#ffa726",
  },
};

const ProductsSummaryScreen = () => {
  const { data, error, isLoading } = useGetRecentUserProductsQuery();

  const aggregatedData = useMemo(() => {
    if (!data) return null;

    let lowHealthScoreCount = 0;
    let normalHealthScoreCount = 0;
    let highHealthScoreCount = 0;
    const ingredientFrequency: Record<string, number> = {};

    data.forEach((product) => {
      const overallScore = product.result.overall_score || 0;
      if (overallScore < UNHEALTHY_THRESHOLD) {
        lowHealthScoreCount++;
      } else if (overallScore < NORMAL_THRESHOLD) {
        normalHealthScoreCount++;
      } else {
        highHealthScoreCount++;
      }

      product.result.ingredients.forEach(([ingredientName]) => {
        ingredientFrequency[ingredientName] = (ingredientFrequency[ingredientName] || 0) + 1;
      });
    });

    const mostCommonIngredients = Object.entries(ingredientFrequency)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, MAX_INGREDIENTS_TO_DISPLAY)
      .map(([ingredient, count]) => ({ ingredient, count }));

    return {
      totalProducts: data.length,
      lowHealthScoreCount,
      normalHealthScoreCount,
      highHealthScoreCount,
      mostCommonIngredients,
    };
  }, [data]);

  if (isLoading) return <ThemedText>Loading...</ThemedText>;
  if (error) return <ThemedText>Error loading data</ThemedText>;
  if (!aggregatedData) return <ThemedText>No data available</ThemedText>;

  const healthScoreData = [
    { name: "Low", count: aggregatedData.lowHealthScoreCount, color: "#FF4136" },
    { name: "Normal", count: aggregatedData.normalHealthScoreCount, color: "#FF851B" },
    { name: "High", count: aggregatedData.highHealthScoreCount, color: "#2ECC40" },
  ];

  const ingredientData = {
    labels: aggregatedData.mostCommonIngredients.map((item) => item.ingredient),
    datasets: [
      {
        data: aggregatedData.mostCommonIngredients.map((item) => item.count),
      },
    ],
  };

  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1 p-4">
          <ThemedText className="mb-4 text-2xl font-bold">Products Summary</ThemedText>

          {/* Total Products */}
          <View className="mb-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <ThemedText className="mb-2 text-lg font-semibold">Total Products Scanned</ThemedText>
            <ThemedText className="text-3xl font-bold">{aggregatedData.totalProducts}</ThemedText>
          </View>

          {/* Health Score Distribution */}
          <View className="mb-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <ThemedText className="mb-2 text-lg font-semibold">Health Score Distribution</ThemedText>
            <PieChart
              data={healthScoreData}
              width={screenWidth - 32}
              height={220}
              chartConfig={chartConfig}
              accessor="count"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>

          {/* Most Common Ingredients */}
          <View className="mb-4 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <ThemedText className="mb-2 text-lg font-semibold">Most Common Ingredients</ThemedText>
            <BarChart
              data={ingredientData}
              width={screenWidth - 32}
              height={220}
              yAxisLabel=""
              yAxisSuffix=""
              fromZero={true} // Ensure bars start from zero
              chartConfig={{
                ...chartConfig,
                barPercentage: 0.5, // Adjust bar width
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              verticalLabelRotation={30}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default ProductsSummaryScreen;
