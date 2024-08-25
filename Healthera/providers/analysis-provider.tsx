import { ANALYSIS_URL } from "@/API/analysis";
import { router } from "expo-router";
import React, { createContext, useState, useContext, useEffect } from "react";

interface AnalysisContextType {
  uuid: string | null;
  result: any | null;
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
  const [uuid, setUuid] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [status, setStatus] = useState<
    "idle" | "pending" | "completed" | "error"
  >("idle");

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const checkAnalysis = async () => {
      if (!uuid) return;

      try {
        const response = await fetch(ANALYSIS_URL(uuid));
        const data = await response.json();

        if (data.status === "completed") {
          setStatus("completed");
          setResult(data.result);
          clearInterval(intervalId);
          router.push("/product-info");
        } else if (data.status === "pending") {
          setStatus("pending");
        }
      } catch (error) {
        console.error("Error checking analysis:", error);
        setStatus("error");
        clearInterval(intervalId);
      }
    };

    if (uuid) {
      setStatus("pending");
      checkAnalysis();
      intervalId = setInterval(checkAnalysis, 1000); // Check every 5 seconds
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
