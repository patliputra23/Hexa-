import { useEffect } from "react";
import { router } from "expo-router";
import { ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeIn, ZoomIn } from "react-native-reanimated";
import { useAuthStore } from "@/state/auth-store";
import { colors, spacing } from "@/ui/theme";
import { LumenText } from "@/ui/components";

export default function SplashScreen() {
  const status = useAuthStore((state) => state.status);

  useEffect(() => {
    if (status === "signed-in") {
      router.replace("/(tabs)");
    }

    if (status === "signed-out") {
      router.replace("/onboarding");
    }
  }, [status]);

  return (
    <LinearGradient colors={[colors.graphite, "#141B22"]} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Animated.View
        entering={ZoomIn.springify().damping(14)}
        style={{
          width: 118,
          height: 118,
          borderRadius: 36,
          borderCurve: "continuous",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.amber,
          marginBottom: spacing.xl
        }}
      >
        <LumenText variant="hero" style={{ color: colors.graphite }}>
          Lu
        </LumenText>
      </Animated.View>
      <Animated.View entering={FadeIn.delay(120)} style={{ alignItems: "center", gap: spacing.sm }}>
        <LumenText variant="hero">Lumen</LumenText>
        <LumenText muted>Original demo music, tuned for night mode.</LumenText>
        <ActivityIndicator color={colors.amber} style={{ marginTop: spacing.lg }} />
      </Animated.View>
    </LinearGradient>
  );
}
