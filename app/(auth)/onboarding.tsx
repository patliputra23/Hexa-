import { Link } from "expo-router";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Headphones, Sparkles } from "lucide-react-native";
import { colors, spacing } from "@/ui/theme";
import { LumenText, PrimaryButton, Screen } from "@/ui/components";

export default function OnboardingScreen() {
  return (
    <Screen scroll={false} padded={false}>
      <LinearGradient
        colors={[colors.graphite, "#152027", colors.graphite]}
        style={{ flex: 1, justifyContent: "space-between", padding: spacing.xl }}
      >
        <View style={{ gap: spacing.xl, paddingTop: spacing.xxl }}>
          <Animated.View
            entering={FadeInDown.duration(260)}
            style={{
              width: 88,
              height: 88,
              borderRadius: 28,
              borderCurve: "continuous",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.amber
            }}
          >
            <Sparkles color={colors.graphite} size={34} />
          </Animated.View>
          <View style={{ gap: spacing.md }}>
            <LumenText variant="hero">Lumen</LumenText>
            <LumenText variant="title">A premium music space with its own pulse.</LumenText>
            <LumenText muted>
              Explore fictional licensed demo tracks, shape your queue, build playlists, and keep favorites available offline.
            </LumenText>
          </View>
        </View>

        <View
          style={{
            borderRadius: 28,
            borderCurve: "continuous",
            padding: spacing.lg,
            gap: spacing.lg,
            backgroundColor: "rgba(19, 23, 29, 0.78)",
            borderWidth: 1,
            borderColor: colors.border
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
            <Headphones color={colors.teal} size={24} />
            <LumenText>Android-first demo with background playback prepared for release builds.</LumenText>
          </View>
          <Link href="/signup" asChild>
            <PrimaryButton accessibilityLabel="Create a Lumen account">Create account</PrimaryButton>
          </Link>
          <Link href="/login" asChild>
            <PrimaryButton tone="quiet" accessibilityLabel="Log in to Lumen">
              I already have one
            </PrimaryButton>
          </Link>
        </View>
      </LinearGradient>
    </Screen>
  );
}
