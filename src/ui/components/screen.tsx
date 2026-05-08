import type { PropsWithChildren } from "react";
import { ScrollView, View, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn } from "react-native-reanimated";
import { colors, spacing } from "@/ui/theme";
import { OfflineBanner } from "./offline-banner";

type ScreenProps = PropsWithChildren<{
  scroll?: boolean;
  padded?: boolean;
  style?: ViewStyle;
}>;

export function Screen({ children, scroll = true, padded = true, style }: ScreenProps) {
  const insets = useSafeAreaInsets();
  const contentStyle = {
    paddingHorizontal: padded ? spacing.lg : 0,
    paddingTop: spacing.lg,
    paddingBottom: insets.bottom + 112,
    gap: spacing.lg
  };

  if (!scroll) {
    return (
      <View style={[{ flex: 1, backgroundColor: colors.graphite, paddingTop: insets.top }, style]}>
        <OfflineBanner />
        <Animated.View entering={FadeIn.duration(220)} style={{ flex: 1, paddingHorizontal: padded ? spacing.lg : 0 }}>
          {children}
        </Animated.View>
      </View>
    );
  }

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={[{ flex: 1, backgroundColor: colors.graphite }, style]}
      contentContainerStyle={contentStyle}
    >
      <OfflineBanner />
      <Animated.View entering={FadeIn.duration(220)} style={{ gap: spacing.lg }}>
        {children}
      </Animated.View>
    </ScrollView>
  );
}
