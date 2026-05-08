import { Link } from "expo-router";
import { Pressable, View } from "react-native";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { Pause, Play } from "lucide-react-native";
import { catalogIndexes } from "@/data/mock-catalog";
import { getArtistName } from "@/data/catalog-api";
import { usePlayerStore } from "@/state/player-store";
import { colors, spacing } from "@/ui/theme";
import { Artwork } from "./artwork";
import { IconButton } from "./buttons";
import { LumenText } from "./lumen-text";

export function MiniPlayer() {
  const currentTrackId = usePlayerStore((state) => state.currentTrackId);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const track = currentTrackId ? catalogIndexes.tracksById[currentTrackId] : null;

  if (!track) {
    return null;
  }

  return (
    <Animated.View
      entering={SlideInDown.springify().damping(18)}
      exiting={SlideOutDown.duration(180)}
      style={{
        position: "absolute",
        left: spacing.md,
        right: spacing.md,
        bottom: 86,
        zIndex: 20
      }}
    >
      <Link href="/player" asChild>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Open player for ${track.title}`}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: spacing.md,
            padding: spacing.sm,
            borderRadius: 22,
            borderCurve: "continuous",
            backgroundColor: "rgba(19, 23, 29, 0.96)",
            borderWidth: 1,
            borderColor: colors.border
          }}
        >
          <Artwork token={track.artworkToken} color={track.color} size={52} />
          <View style={{ flex: 1 }}>
            <LumenText numberOfLines={1}>{track.title}</LumenText>
            <LumenText variant="caption" muted numberOfLines={1}>
              {getArtistName(track.artistId)}
            </LumenText>
          </View>
          <IconButton
            icon={isPlaying ? Pause : Play}
            label={isPlaying ? "Pause mini player" : "Play mini player"}
            active
            onPress={(event) => {
              event.stopPropagation();
              togglePlay();
            }}
          />
        </Pressable>
      </Link>
    </Animated.View>
  );
}
