import { View } from "react-native";
import { Heart, MoreHorizontal, Play } from "lucide-react-native";
import Animated, { FadeInUp, LinearTransition } from "react-native-reanimated";
import { getArtistName } from "@/data/catalog-api";
import { useLibraryStore } from "@/state/library-store";
import { usePlayerStore } from "@/state/player-store";
import type { Track } from "@/types/music";
import { colors, spacing } from "@/ui/theme";
import { formatDuration } from "@/ui/utils/format";
import { Artwork } from "./artwork";
import { CardPressable, IconButton } from "./buttons";
import { DownloadButton } from "./download-button";
import { LumenText } from "./lumen-text";

export function TrackCard({
  track,
  queue,
  index = 0,
  compact = false
}: {
  track: Track;
  queue?: string[];
  index?: number;
  compact?: boolean;
}) {
  const startTrack = usePlayerStore((state) => state.startTrack);
  const currentTrackId = usePlayerStore((state) => state.currentTrackId);
  const isFavorite = useLibraryStore((state) => state.isFavoriteTrack(track.id));
  const toggleFavoriteTrack = useLibraryStore((state) => state.toggleFavoriteTrack);
  const active = currentTrackId === track.id;

  return (
    <Animated.View entering={FadeInUp.delay(index * 35).duration(240)} layout={LinearTransition.duration(180)}>
      <CardPressable
        accessibilityLabel={`Play ${track.title} by ${getArtistName(track.artistId)}`}
        onPress={() => startTrack(track.id, queue)}
        style={{
          borderColor: active ? "rgba(247, 178, 103, 0.55)" : colors.border,
          backgroundColor: active ? "rgba(247, 178, 103, 0.10)" : colors.graphiteRaised
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
          <Artwork token={track.artworkToken} color={track.color} size={compact ? 54 : 64} />
          <View style={{ flex: 1, gap: spacing.xs }}>
            <LumenText numberOfLines={1}>{track.title}</LumenText>
            <LumenText variant="caption" muted numberOfLines={1}>
              {getArtistName(track.artistId)} - {track.mood} - {formatDuration(track.duration)}
            </LumenText>
          </View>
          {compact ? null : <DownloadButton trackId={track.id} isDownloadable={track.isDownloadable} />}
          <IconButton
            icon={Heart}
            label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            active={isFavorite}
            onPress={(event) => {
              event.stopPropagation();
              toggleFavoriteTrack(track.id);
            }}
          />
          <IconButton icon={active ? MoreHorizontal : Play} label={active ? "Now playing" : "Play track"} size={40} active={active} />
        </View>
      </CardPressable>
    </Animated.View>
  );
}
