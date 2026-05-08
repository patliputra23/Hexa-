import type { PropsWithChildren } from "react";
import { Text, type TextProps } from "react-native";
import { colors, typography } from "@/ui/theme";

type Variant = "caption" | "body" | "title" | "hero";

type LumenTextProps = PropsWithChildren<
  TextProps & {
    variant?: Variant;
    muted?: boolean;
  }
>;

export function LumenText({ children, variant = "body", muted, style, ...props }: LumenTextProps) {
  const fontSize = typography.size[variant];
  const lineHeight = variant === "hero" ? 40 : Math.round(fontSize * 1.35);
  const fontWeight = variant === "body" || variant === "caption" ? "500" : "700";

  return (
    <Text
      selectable={props.selectable}
      {...props}
      style={[
        {
          color: muted ? colors.ivoryMuted : colors.ivory,
          fontSize,
          lineHeight,
          fontWeight,
          letterSpacing: 0
        },
        style
      ]}
    >
      {children}
    </Text>
  );
}
