import { useState } from "react";
import { TextInput, View, type TextInputProps } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { colors, spacing } from "@/ui/theme";
import { LumenText } from "./lumen-text";

type TextFieldProps = TextInputProps & {
  label: string;
};

export function TextField({ label, style, ...props }: TextFieldProps) {
  const [focused, setFocused] = useState(false);
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  return (
    <View style={{ gap: spacing.sm }}>
      <LumenText variant="caption" muted style={{ color: focused ? colors.amber : colors.ivoryMuted }}>
        {label}
      </LumenText>
      <Animated.View style={animatedStyle}>
        <TextInput
          placeholderTextColor={focused ? "rgba(244, 240, 232, 0.7)" : colors.ivoryMuted}
          selectionColor={colors.amber}
          onFocus={(event) => {
            setFocused(true);
            scale.value = withSpring(1.01, { damping: 18, stiffness: 220 });
            props.onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            scale.value = withSpring(1, { damping: 18, stiffness: 220 });
            props.onBlur?.(event);
          }}
          style={[
            {
              minHeight: 52,
              borderRadius: 16,
              borderCurve: "continuous",
              borderWidth: 1,
              borderColor: focused ? "rgba(247, 178, 103, 0.42)" : colors.border,
              backgroundColor: focused ? "rgba(33, 38, 47, 0.92)" : colors.graphiteRaised,
              color: colors.ivory,
              paddingHorizontal: spacing.lg,
              fontSize: 16
            },
            style
          ]}
          {...props}
        />
      </Animated.View>
    </View>
  );
}
