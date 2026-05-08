import { Stack } from "expo-router";
import { colors } from "@/ui/theme";

export default function LibraryLayout() {
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: colors.graphite }, headerTintColor: colors.ivory, headerShadowVisible: false }}>
      <Stack.Screen name="index" options={{ title: "Library" }} />
    </Stack>
  );
}
