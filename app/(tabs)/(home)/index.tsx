import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { ScrollView, View } from "react-native";
import { ListMusic } from "lucide-react-native";
import { mockCatalogApi } from "@/data/catalog-api";
import type { Album, Artist, Track } from "@/types/music";
import {
  AlbumCard,
  ArtistChip,
  EmptyState,
  IconButton,
  LumenText,
  Screen,
  SkeletonBlock,
  TrackCard
} from "@/ui/components";
import { colors, spacing } from "@/ui/theme";

type HomeFeed = {
  featured: Track[];
  continueListening: Track[];
  recentlyPlayed: Track[];
  newAlbums: Album[];
  artists: Artist[];
};

export default function HomeScreen() {
  const [feed, setFeed] = useState<HomeFeed | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    mockCatalogApi
      .getHomeFeed()
      .then(setFeed)
      .catch(() => setError("The Lumen catalog could not load."));
  }, []);

  if (error) {
    return (
      <Screen>
        <EmptyState title="Feed unavailable" body={error} actionLabel="Retry" onAction={() => setError(null)} />
      </Screen>
    );
  }

  if (!feed) {
    return (
      <Screen>
        <SkeletonBlock height={160} />
        <SkeletonBlock />
        <SkeletonBlock />
      </Screen>
    );
  }

  const queue = feed.featured.map((track) => track.id);

  return (
    <Screen>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
        <View style={{ flex: 1, gap: spacing.xs }}>
          <LumenText variant="hero">Tonight on Lumen</LumenText>
          <LumenText muted>Warm detail, clean motion, and original demo tracks.</LumenText>
        </View>
        <Link href="/queue" asChild>
          <IconButton icon={ListMusic} label="Open queue" />
        </Link>
      </View>

      <View
        style={{
          borderRadius: 30,
          borderCurve: "continuous",
          padding: spacing.lg,
          gap: spacing.md,
          backgroundColor: "rgba(247, 178, 103, 0.12)",
          borderWidth: 1,
          borderColor: "rgba(247, 178, 103, 0.28)"
        }}
      >
        <LumenText variant="caption" muted>
          EDITORIAL SIGNAL
        </LumenText>
        <LumenText variant="title">Afterimage Rooms</LumenText>
        <LumenText muted>Original luminous pieces for focus, winding down, and late-window listening.</LumenText>
        <TrackCard track={feed.featured[0]} queue={queue} compact />
      </View>

      <SectionTitle title="Continue listening" />
      {feed.continueListening.map((track, index) => (
        <TrackCard key={track.id} track={track} queue={queue} index={index} />
      ))}

      <SectionTitle title="New rooms" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.md }}>
        {feed.newAlbums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </ScrollView>

      <SectionTitle title="Artists in glow" />
      <View style={{ gap: spacing.md }}>
        {feed.artists.map((artist) => (
          <ArtistChip key={artist.id} artist={artist} />
        ))}
      </View>
    </Screen>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <LumenText variant="title" style={{ color: colors.ivory }}>{title}</LumenText>;
}
