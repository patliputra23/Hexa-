import Slider from "@react-native-community/slider";
import { View } from "react-native";
import { colors, spacing } from "@/ui/theme";
import { formatDuration } from "@/ui/utils/format";
import { LumenText } from "./lumen-text";

export function ProgressScrubber({
  position,
  duration,
  onSeek
}: {
  position: number;
  duration: number;
  onSeek: (value: number) => void;
}) {
  return (
    <View style={{ gap: spacing.xs }}>
      <Slider
        accessibilityLabel="Playback position"
        minimumValue={0}
        maximumValue={Math.max(duration, 1)}
        value={Math.min(position, Math.max(duration, 1))}
        minimumTrackTintColor={colors.amber}
        maximumTrackTintColor={colors.graphiteSoft}
        thumbTintColor={colors.ivory}
        onSlidingComplete={onSeek}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <LumenText variant="caption" muted style={{ fontVariant: ["tabular-nums"] }}>
          {formatDuration(position)}
        </LumenText>
        <LumenText variant="caption" muted style={{ fontVariant: ["tabular-nums"] }}>
          {formatDuration(duration)}
        </LumenText>
      </View>
    </View>
  );
}
