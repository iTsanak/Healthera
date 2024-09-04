import { ANALYSIS_ENDPOINT } from "@/API/analysis";
import { router } from "expo-router";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useAPI } from "./api-provider";
import logAxiosError from "@/lib/axios-better-errors";

export type IngredientJsonType = [string, number, string];

export type GeminiJsonType = {
  overall_score: number;
  ingredients: IngredientJsonType[];
  additional_notes: string;
};

interface AnalysisContextType {
  uuid: string | null;
  result: GeminiJsonType | null;
  status: "idle" | "pending" | "completed" | "error";
  setUuid: (uuid: string) => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(
  undefined,
);

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error("useAnalysis must be used within an AnalysisProvider");
  }
  return context;
};

export const AnalysisProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { api } = useAPI();
  const [uuid, setUuid] = useState<string | null>(null);
  const [result, setResult] = useState<GeminiJsonType | null>(null);
  const [status, setStatus] = useState<
    "idle" | "pending" | "completed" | "error"
  >("idle");

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const checkAnalysis = async () => {
      if (!uuid) return;

      try {
        const response = await api.get(ANALYSIS_ENDPOINT(uuid));
        const data = response.data;

        if (data.status === "completed") {
          setStatus("completed");
          setResult(data.result);
          clearInterval(intervalId);
          router.push({
            pathname: "/product-info",
            params: { result: JSON.stringify(data.result) },
          });
        } else if (data.status === "pending") {
          setStatus("pending");
        }
      } catch (error) {
        logAxiosError(error, "Error checking analysis:");
        console.error("[USE_ANALYSIS]: Error checking analysis:", error);
        setStatus("error");
        clearInterval(intervalId);
      }
    };

    if (uuid) {
      setStatus("pending");
      checkAnalysis();
      intervalId = setInterval(checkAnalysis, 1000); // Check every 1 seconds
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [uuid]);

  return (
    <AnalysisContext.Provider value={{ uuid, result, status, setUuid }}>
      {children}
    </AnalysisContext.Provider>
  );
};
