import { Pressable, Switch, View } from "react-native";
import type { LucideIcon } from "lucide-react-native";
import { colors, spacing } from "@/ui/theme";
import { LumenText } from "./lumen-text";

export function SettingsRow({
  icon: Icon,
  title,
  body,
  value,
  onValueChange,
  onPress
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  onPress?: () => void;
}) {
  return (
    <Pressable
      accessibilityRole={onValueChange ? "switch" : "button"}
      accessibilityState={onValueChange ? { checked: Boolean(value) } : undefined}
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        padding: spacing.md,
        borderRadius: 20,
        backgroundColor: colors.graphiteRaised,
        borderWidth: 1,
        borderColor: colors.border
      }}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.graphiteSoft
        }}
      >
        <Icon color={colors.amber} size={22} />
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <LumenText>{title}</LumenText>
        <LumenText variant="caption" muted>
          {body}
        </LumenText>
      </View>
      {onValueChange ? (
        <Switch
          value={Boolean(value)}
          onValueChange={onValueChange}
          trackColor={{ true: colors.teal, false: colors.graphiteSoft }}
          thumbColor={colors.ivory}
          accessibilityLabel={title}
        />
      ) : null}
    </Pressable>
  );
}
