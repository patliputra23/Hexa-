import { Pressable, View } from "react-native";
import * as Haptics from "expo-haptics";
import { colors, spacing } from "@/ui/theme";
import { LumenText } from "./lumen-text";

type SegmentedTabsProps<T extends string> = {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
};

export function SegmentedTabs<T extends string>({ value, options, onChange }: SegmentedTabsProps<T>) {
  return (
    <View
      accessibilityRole="tablist"
      style={{
        flexDirection: "row",
        backgroundColor: colors.graphiteRaised,
        borderRadius: 16,
        borderCurve: "continuous",
        padding: 4,
        gap: spacing.xs
      }}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => {
              Haptics.selectionAsync().catch(() => {});
              onChange(option.value);
            }}
            style={{
              flex: 1,
              minHeight: 38,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12,
              backgroundColor: active ? colors.amber : "transparent"
            }}
          >
            <LumenText variant="caption" style={{ color: active ? colors.graphite : colors.ivoryMuted, fontWeight: "800" }}>
              {option.label}
            </LumenText>
          </Pressable>
        );
      })}
    </View>
  );
}
