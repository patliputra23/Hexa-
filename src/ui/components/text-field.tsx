import { TextInput, View, type TextInputProps } from "react-native";
import { colors, spacing } from "@/ui/theme";
import { LumenText } from "./lumen-text";

type TextFieldProps = TextInputProps & {
  label: string;
};

export function TextField({ label, style, ...props }: TextFieldProps) {
  return (
    <View style={{ gap: spacing.sm }}>
      <LumenText variant="caption" muted>
        {label}
      </LumenText>
      <TextInput
        placeholderTextColor={colors.ivoryMuted}
        selectionColor={colors.amber}
        style={[
          {
            minHeight: 52,
            borderRadius: 16,
            borderCurve: "continuous",
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.graphiteRaised,
            color: colors.ivory,
            paddingHorizontal: spacing.lg,
            fontSize: 16
          },
          style
        ]}
        {...props}
      />
    </View>
  );
}
