import { Stack } from "expo-router";
import { colors } from "@/ui/theme";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.graphite },
        headerTintColor: colors.ivory,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.graphite }
      }}
    >
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ title: "Log in" }} />
      <Stack.Screen name="signup" options={{ title: "Create account" }} />
    </Stack>
  );
}
