import SplashScreenL from "@/components/LoadingScreens/SplashScreen";
import { useSession } from "@/providers/session-provider";
import { Redirect, Stack } from "expo-router";
import { useEffect, useState } from "react";

export default function AppLayout() {
  const { user, loadStoredUser } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateUser = async () => {
      if (!user) {
        await loadStoredUser();
      }
      setLoading(false);
    };

    validateUser();
  }, [user, loadStoredUser]);

  if (loading) {
    return <SplashScreenL />;
  }

  if (!user) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(profile)" options={{ headerShown: false }} />
      <Stack.Screen name="(settings)" options={{ headerShown: false }} />
      <Stack.Screen name="(products)" options={{ headerShown: false }} />
    </Stack>
  );
}
