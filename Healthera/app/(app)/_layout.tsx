import { useSession } from "@/providers/session-provider";
import { Redirect, Stack } from "expo-router";

export default function AppLayout() {
  const { isLoggedIn } = useSession();

  if (isLoggedIn) {
    return <Redirect href={"/onboarding"} />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(profile)" options={{ headerShown: false }} />
      <Stack.Screen name="(settings)" options={{ headerShown: false }} />
    </Stack>
  );
}
