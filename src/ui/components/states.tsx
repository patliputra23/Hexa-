import { View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { AlertTriangle, SearchX } from "lucide-react-native";
import { colors, spacing } from "@/ui/theme";
import { LumenText } from "./lumen-text";
import { PrimaryButton } from "./buttons";

export function SkeletonBlock({ height = 88 }: { height?: number }) {
  return (
    <Animated.View
      entering={FadeIn.duration(180)}
      exiting={FadeOut.duration(180)}
    >
      <View
        style={{
          height,
          borderRadius: 20,
          borderCurve: "continuous",
          backgroundColor: colors.graphiteRaised,
          borderWidth: 1,
          borderColor: colors.mutedBorder,
          opacity: 0.78
        }}
      />
    </Animated.View>
  );
}

export function EmptyState({
  title,
  body,
  actionLabel,
  onAction
}: {
  title: string;
  body: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: spacing.xl,
        gap: spacing.md,
        borderRadius: 24,
        borderCurve: "continuous",
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.graphiteRaised
      }}
    >
      <SearchX color={colors.ivoryMuted} size={32} />
      <LumenText variant="title" style={{ textAlign: "center" }}>
        {title}
      </LumenText>
      <LumenText muted style={{ textAlign: "center" }}>
        {body}
      </LumenText>
      {actionLabel && onAction ? <PrimaryButton onPress={onAction}>{actionLabel}</PrimaryButton> : null}
    </View>
  );
}

export function ErrorBanner({ message }: { message: string | null }) {
  if (!message) {
    return null;
  }

  return (
    <View
      accessibilityRole="alert"
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        padding: spacing.md,
        borderRadius: 16,
        borderCurve: "continuous",
        backgroundColor: "rgba(255, 107, 107, 0.14)",
        borderWidth: 1,
        borderColor: "rgba(255, 107, 107, 0.3)"
      }}
    >
      <AlertTriangle color={colors.danger} size={18} />
      <LumenText selectable style={{ flex: 1, color: colors.danger }}>
        {message}
      </LumenText>
    </View>
  );
}
