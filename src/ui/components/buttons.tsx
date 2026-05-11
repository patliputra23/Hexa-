import type { PropsWithChildren } from "react";
import { Pressable, View, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import type { LucideIcon } from "lucide-react-native";
import { colors, spacing } from "@/ui/theme";
import { LumenText } from "./lumen-text";

type StaticPressableProps = Omit<PressableProps, "style"> & {
  style?: StyleProp<ViewStyle>;
};

type PrimaryButtonProps = PropsWithChildren<
  StaticPressableProps & {
    tone?: "amber" | "teal" | "quiet";
  }
>;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function PrimaryButton({ children, tone = "amber", style, disabled, ...props }: PrimaryButtonProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));
  const backgroundColor = tone === "teal" ? colors.teal : tone === "quiet" ? colors.graphiteSoft : colors.amber;
  const textColor = tone === "quiet" ? colors.ivory : colors.graphite;

  return (
    <AnimatedPressable
      accessibilityRole="button"
      disabled={disabled}
      onPressIn={() => {
        scale.value = withSpring(0.985, { damping: 18, stiffness: 240 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 20, stiffness: 260 });
      }}
      onPress={(event) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
        props.onPress?.(event);
      }}
      style={[
        animatedStyle,
        {
          minHeight: 52,
          borderRadius: 18,
          borderCurve: "continuous",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor,
          opacity: disabled ? 0.55 : 1,
          paddingHorizontal: spacing.lg
        },
        style
      ]}
      {...props}
    >
      {typeof children === "string" || typeof children === "number" ? (
        <LumenText style={{ color: textColor, fontWeight: "800" }}>{children}</LumenText>
      ) : (
        children
      )}
    </AnimatedPressable>
  );
}

type IconButtonProps = StaticPressableProps & {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  size?: number;
};

export function IconButton({ icon: Icon, label, active, size = 44, style, ...props }: IconButtonProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  return (
    <AnimatedPressable
      accessibilityLabel={label}
      accessibilityRole="button"
      hitSlop={8}
      onPressIn={() => {
        scale.value = withSpring(0.94, { damping: 16, stiffness: 280 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 18, stiffness: 260 });
      }}
      onPress={(event) => {
        Haptics.selectionAsync().catch(() => {});
        props.onPress?.(event);
      }}
      style={[
        animatedStyle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: active ? colors.amber : colors.graphiteSoft,
          borderWidth: 1,
          borderColor: active ? "transparent" : colors.border,
          shadowColor: "#000",
          shadowOpacity: active ? 0.28 : 0.12,
          shadowRadius: active ? 16 : 8,
          shadowOffset: { width: 0, height: active ? 8 : 4 },
          elevation: active ? 7 : 3
        },
        style
      ]}
      {...props}
    >
      <Icon size={Math.round(size * 0.45)} color={active ? colors.graphite : colors.ivory} strokeWidth={2.2} />
    </AnimatedPressable>
  );
}

export function CardPressable({ children, style, ...props }: PropsWithChildren<StaticPressableProps>) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  return (
    <AnimatedPressable
      accessibilityRole="button"
      onPressIn={() => {
        scale.value = withSpring(0.99, { damping: 18, stiffness: 260 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 20, stiffness: 260 });
      }}
      onPress={(event) => {
        props.onPress?.(event);
      }}
      style={[
        animatedStyle,
        {
          backgroundColor: colors.graphiteRaised,
          borderRadius: 22,
          borderCurve: "continuous",
          borderWidth: 1,
          borderColor: colors.border,
          padding: spacing.md
        },
        style
      ]}
      {...props}
    >
      <View style={{ gap: spacing.sm }}>{children}</View>
    </AnimatedPressable>
  );
}
