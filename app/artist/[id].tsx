import { useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";
import { catalogIndexes, albums, tracks } from "@/data/mock-catalog";
import { AlbumCard, ArtistChip, Artwork, EmptyState, LumenText, Screen, TrackCard } from "@/ui/components";
import { colors, spacing } from "@/ui/theme";
import { formatCompact } from "@/ui/utils/format";

export default function ArtistDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const artist = catalogIndexes.artistsById[id];

  if (!artist) {
    return (
      <Screen>
        <EmptyState title="Artist not found" body="This Lumen artist is not in the demo catalog." />
      </Screen>
    );
  }

  const artistAlbums = albums.filter((album) => album.artistId === artist.id);
  const artistTracks = tracks.filter((track) => track.artistId === artist.id);

  return (
    <Screen>
      <View style={{ alignItems: "center", gap: spacing.lg }}>
        <Artwork token={artist.imageToken} color={artist.color} size={190} />
        <View style={{ alignItems: "center", gap: spacing.xs }}>
          <LumenText variant="hero" style={{ textAlign: "center" }}>
            {artist.name}
          </LumenText>
          <LumenText variant="caption" style={{ color: colors.teal }}>
            {formatCompact(artist.monthlyListeners)} monthly listeners
          </LumenText>
          <LumenText muted style={{ textAlign: "center" }}>
            {artist.bio}
          </LumenText>
        </View>
      </View>

      <LumenText variant="title">Popular tracks</LumenText>
      {artistTracks.map((track, index) => (
        <TrackCard key={track.id} track={track} queue={artistTracks.map((item) => item.id)} index={index} />
      ))}

      <LumenText variant="title">Albums</LumenText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.md }}>
        {artistAlbums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </ScrollView>

      <LumenText variant="title">Related roster</LumenText>
      {Object.values(catalogIndexes.artistsById)
        .filter((item) => item.id !== artist.id)
        .slice(0, 2)
        .map((item) => (
          <ArtistChip key={item.id} artist={item} />
        ))}
    </Screen>
  );
}
