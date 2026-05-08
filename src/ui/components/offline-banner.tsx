import { View } from "react-native";
import { WifiOff } from "lucide-react-native";
import { useLibraryStore } from "@/state/library-store";
import { colors, spacing } from "@/ui/theme";
import { LumenText } from "./lumen-text";

export function OfflineBanner() {
  const isOffline = useLibraryStore((state) => state.isOffline);

  if (!isOffline) {
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
        backgroundColor: "rgba(46, 196, 182, 0.12)",
        borderWidth: 1,
        borderColor: "rgba(46, 196, 182, 0.28)"
      }}
    >
      <WifiOff color={colors.teal} size={18} />
      <LumenText selectable muted>
        Offline mode. Downloaded licensed demo tracks stay available.
      </LumenText>
    </View>
  );
}
