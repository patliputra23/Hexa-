import { Link, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Play } from "lucide-react-native";
import { catalogIndexes } from "@/data/mock-catalog";
import { getArtistName, getTracksByIds } from "@/data/catalog-api";
import { Artwork, EmptyState, LumenText, PrimaryButton, Screen, TrackCard } from "@/ui/components";
import { colors, spacing } from "@/ui/theme";
import { usePlayerStore } from "@/state/player-store";

export default function AlbumDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const album = catalogIndexes.albumsById[id];
  const startTrack = usePlayerStore((state) => state.startTrack);

  if (!album) {
    return (
      <Screen>
        <EmptyState title="Album not found" body="This Lumen release is not in the demo catalog." />
      </Screen>
    );
  }

  const albumTracks = getTracksByIds(album.trackIds);
  const queue = albumTracks.map((track) => track.id);

  return (
    <Screen>
      <View style={{ alignItems: "center", gap: spacing.lg }}>
        <Artwork token={album.artworkToken} color={album.color} size={220} />
        <View style={{ alignItems: "center", gap: spacing.xs }}>
          <LumenText variant="hero" style={{ textAlign: "center" }}>
            {album.title}
          </LumenText>
          <Link href={`/artist/${album.artistId}`}>
            <LumenText style={{ color: colors.teal }}>{getArtistName(album.artistId)}</LumenText>
          </Link>
          <LumenText variant="caption" muted>
            {album.releaseYear} - {albumTracks.length} tracks
          </LumenText>
        </View>
        <PrimaryButton onPress={() => albumTracks[0] && startTrack(albumTracks[0].id, queue)} accessibilityLabel={`Play ${album.title}`}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
            <Play color={colors.graphite} size={18} />
            <LumenText style={{ color: colors.graphite, fontWeight: "800" }}>Play album</LumenText>
          </View>
        </PrimaryButton>
      </View>

      {albumTracks.map((track, index) => (
        <TrackCard key={track.id} track={track} queue={queue} index={index} />
      ))}
    </Screen>
  );
}
