import { useEffect, useState } from "react";
import { View } from "react-native";
import { mockCatalogApi } from "@/data/catalog-api";
import type { Album, Artist, Track } from "@/types/music";
import {
  AlbumCard,
  ArtistChip,
  EmptyState,
  LumenText,
  Screen,
  SegmentedTabs,
  TextField,
  TrackCard
} from "@/ui/components";
import { spacing } from "@/ui/theme";

type SearchTab = "tracks" | "albums" | "artists";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<SearchTab>("tracks");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const id = setTimeout(() => {
      mockCatalogApi.search(query).then((results) => {
        setTracks(results.tracks);
        setAlbums(results.albums);
        setArtists(results.artists);
      });
    }, 140);

    return () => clearTimeout(id);
  }, [query]);

  return (
    <Screen>
      <View style={{ gap: spacing.sm }}>
        <LumenText variant="hero">Search</LumenText>
        <LumenText muted>Find fictional tracks, albums, and artists in the demo catalog.</LumenText>
      </View>
      <TextField label="Search Lumen" value={query} onChangeText={setQuery} accessibilityLabel="Search Lumen catalog" />
      <SegmentedTabs
        value={tab}
        onChange={setTab}
        options={[
          { value: "tracks", label: "Tracks" },
          { value: "albums", label: "Albums" },
          { value: "artists", label: "Artists" }
        ]}
      />

      {tab === "tracks" ? (
        <View style={{ gap: spacing.md }}>
          {tracks.length ? (
            tracks.map((track, index) => <TrackCard key={track.id} track={track} queue={tracks.map((item) => item.id)} index={index} />)
          ) : (
            <EmptyState title="No tracks found" body="Try a mood like focus, pulse, or the name of a Lumen demo track." />
          )}
        </View>
      ) : null}

      {tab === "albums" ? (
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
          {albums.length ? albums.map((album) => <AlbumCard key={album.id} album={album} />) : <EmptyState title="No albums found" body="The demo catalog is intentionally small and original." />}
        </View>
      ) : null}

      {tab === "artists" ? (
        <View style={{ gap: spacing.md }}>
          {artists.length ? artists.map((artist) => <ArtistChip key={artist.id} artist={artist} />) : <EmptyState title="No artists found" body="Search Mara, Oriel, or Nova to explore the fictional roster." />}
        </View>
      ) : null}
    </Screen>
  );
}
