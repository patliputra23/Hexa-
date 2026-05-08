import { LinearGradient } from "expo-linear-gradient";
import { View, type ViewStyle } from "react-native";
import { colors } from "@/ui/theme";
import { LumenText } from "./lumen-text";

type ArtworkProps = {
  token: string;
  color: string;
  size?: number;
  style?: ViewStyle;
};

export function Artwork({ token, color, size = 72, style }: ArtworkProps) {
  return (
    <LinearGradient
      colors={[color, colors.graphiteSoft]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        {
          width: size,
          height: size,
          borderRadius: Math.min(22, size / 4),
          borderCurve: "continuous",
          justifyContent: "flex-end",
          padding: Math.max(8, size / 10),
          overflow: "hidden"
        },
        style
      ]}
    >
      <View
        style={{
          position: "absolute",
          right: -size * 0.18,
          top: -size * 0.15,
          width: size * 0.72,
          height: size * 0.72,
          borderRadius: size,
          backgroundColor: "rgba(244, 240, 232, 0.16)"
        }}
      />
      <LumenText variant={size > 100 ? "hero" : "title"}>{token}</LumenText>
    </LinearGradient>
  );
}
