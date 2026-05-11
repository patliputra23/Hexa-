import { useEffect, useRef, useState } from "react";
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
  const maxDuration = Math.max(duration, 1);
  const [displayPosition, setDisplayPosition] = useState(Math.min(position, maxDuration));
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const target = Math.min(position, maxDuration);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const step = () => {
      setDisplayPosition((prev) => {
        const next = prev + (target - prev) * 0.24;
        if (Math.abs(target - next) < 0.015) {
          return target;
        }
        animationRef.current = requestAnimationFrame(step);
        return next;
      });
    };

    animationRef.current = requestAnimationFrame(step);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [maxDuration, position]);

  return (
    <View style={{ gap: spacing.xs }}>
      <Slider
        accessibilityLabel="Playback position"
        minimumValue={0}
        maximumValue={maxDuration}
        value={displayPosition}
        minimumTrackTintColor={colors.amber}
        maximumTrackTintColor={colors.graphiteSoft}
        thumbTintColor={colors.ivory}
        onSlidingComplete={onSeek}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <LumenText variant="caption" muted style={{ fontVariant: ["tabular-nums"] }}>
          {formatDuration(displayPosition)}
        </LumenText>
        <LumenText variant="caption" muted style={{ fontVariant: ["tabular-nums"] }}>
          {formatDuration(duration)}
        </LumenText>
      </View>
    </View>
  );
}
