import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";

import { AnalysisProvider } from "@/providers/analysis-provider";
import GreenSpinner from "@/components/LoadingScreens/green-spinner";

import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { loadUser, selectAuthInitialLoadStatus, selectUserId } from "@/redux/auth/auth-slice";
import { loadTokens, selectAuthSecretsInitialLoadStatus } from "@/redux/auth-secrets/auth-secrets-slice";

export default function AppLayout() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(selectUserId);
  const userLoadingStatus = useAppSelector(selectAuthInitialLoadStatus);
  const authTokensLoadingStatus = useAppSelector(selectAuthSecretsInitialLoadStatus);

  useEffect(() => {
    if (userLoadingStatus === "idle" && authTokensLoadingStatus === "idle") {
      const initData = async () => {
        await Promise.all([dispatch(loadUser()), dispatch(loadTokens())]);
      };
      initData();
    }
  }, [dispatch, userLoadingStatus, authTokensLoadingStatus]);

  if (
    userLoadingStatus === "idle" ||
    userLoadingStatus === "loading" ||
    authTokensLoadingStatus === "idle" ||
    authTokensLoadingStatus === "loading"
  ) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <GreenSpinner />
      </SafeAreaView>
    );
  }

  if (!userId) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <AnalysisProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(profile)" options={{ headerShown: false }} />
        <Stack.Screen name="(settings)" options={{ headerShown: false }} />
        <Stack.Screen name="(products)" options={{ headerShown: false }} />
        <Stack.Screen name="(notifications)" options={{ headerShown: false }} />
      </Stack>
    </AnalysisProvider>
  );
}
