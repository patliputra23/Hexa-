import { Link } from "expo-router";
import { View } from "react-native";
import { Heart, ListMusic } from "lucide-react-native";
import { catalogIndexes, tracks } from "@/data/mock-catalog";
import { getAlbumTitle, getArtistName } from "@/data/catalog-api";
import { useLibraryStore } from "@/state/library-store";
import { usePlayerStore } from "@/state/player-store";
import {
  Artwork,
  DownloadButton,
  EmptyState,
  IconButton,
  LumenText,
  PlayerControls,
  PrimaryButton,
  ProgressScrubber,
  Screen
} from "@/ui/components";
import { colors, spacing } from "@/ui/theme";

export default function PlayerScreen() {
  const currentTrackId = usePlayerStore((state) => state.currentTrackId);
  const startTrack = usePlayerStore((state) => state.startTrack);
  const position = usePlayerStore((state) => state.position);
  const duration = usePlayerStore((state) => state.duration);
  const seek = usePlayerStore((state) => state.seek);
  const error = usePlayerStore((state) => state.error);
  const isFavorite = useLibraryStore((state) => (currentTrackId ? state.isFavoriteTrack(currentTrackId) : false));
  const toggleFavoriteTrack = useLibraryStore((state) => state.toggleFavoriteTrack);
  const track = currentTrackId ? catalogIndexes.tracksById[currentTrackId] : null;

  if (!track) {
    return (
      <Screen>
        <EmptyState
          title="Nothing playing"
          body="Start with Lumen's first original demo track."
          actionLabel="Play Aurora Circuit"
          onAction={() => startTrack(tracks[0].id, tracks.map((item) => item.id))}
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={{ alignItems: "center", gap: spacing.xl }}>
        <Artwork token={track.artworkToken} color={track.color} size={260} />
        <View style={{ alignItems: "center", gap: spacing.xs }}>
          <LumenText variant="hero" style={{ textAlign: "center" }}>
            {track.title}
          </LumenText>
          <LumenText style={{ color: colors.teal }}>{getArtistName(track.artistId)}</LumenText>
          <LumenText variant="caption" muted>
            {getAlbumTitle(track.albumId)} - {track.licenseStatus}
          </LumenText>
        </View>
      </View>

      {error ? (
        <LumenText selectable style={{ color: colors.danger, textAlign: "center" }}>
          {error}
        </LumenText>
      ) : null}

      <ProgressScrubber position={position} duration={duration || track.duration} onSeek={seek} />
      <PlayerControls large />

      <View style={{ flexDirection: "row", justifyContent: "center", gap: spacing.md }}>
        <IconButton
          icon={Heart}
          label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          active={isFavorite}
          onPress={() => toggleFavoriteTrack(track.id)}
        />
        <DownloadButton trackId={track.id} isDownloadable={track.isDownloadable} />
        <Link href="/queue" asChild>
          <IconButton icon={ListMusic} label="Open queue" />
        </Link>
      </View>

      <Link href={`/album/${track.albumId}`} asChild>
        <PrimaryButton tone="quiet" accessibilityLabel="View album">
          View album
        </PrimaryButton>
      </Link>
    </Screen>
  );
}
