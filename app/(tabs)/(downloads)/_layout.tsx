import { Stack } from "expo-router";
import { colors } from "@/ui/theme";

export default function DownloadsLayout() {
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: colors.graphite }, headerTintColor: colors.ivory, headerShadowVisible: false }}>
      <Stack.Screen name="index" options={{ title: "Downloads" }} />
    </Stack>
  );
}
