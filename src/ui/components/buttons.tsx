import type { PropsWithChildren } from "react";
import { Pressable, View, type PressableProps, type StyleProp, type ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
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
        scale.value = withSpring(0.98);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
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
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      hitSlop={8}
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: active ? colors.amber : colors.graphiteSoft,
          borderWidth: 1,
          borderColor: active ? "transparent" : colors.border
        },
        style
      ]}
      {...props}
    >
      <Icon size={Math.round(size * 0.45)} color={active ? colors.graphite : colors.ivory} strokeWidth={2.2} />
    </Pressable>
  );
}

export function CardPressable({ children, style, ...props }: PropsWithChildren<StaticPressableProps>) {
  return (
    <Pressable
      accessibilityRole="button"
      style={[
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
    </Pressable>
  );
}
