import { useState } from "react";
import { View } from "react-native";
import { Plus } from "lucide-react-native";
import { catalogIndexes } from "@/data/mock-catalog";
import { useLibraryStore } from "@/state/library-store";
import { EmptyState, IconButton, LumenText, PlaylistTile, Screen, SegmentedTabs, TrackCard } from "@/ui/components";
import { spacing } from "@/ui/theme";

type LibraryTab = "favorites" | "playlists" | "recent";

export default function LibraryScreen() {
  const [tab, setTab] = useState<LibraryTab>("favorites");
  const favorites = useLibraryStore((state) => state.favorites.trackIds);
  const playlists = useLibraryStore((state) => state.playlists);
  const recentlyPlayed = useLibraryStore((state) => state.recentlyPlayed);
  const createPlaylist = useLibraryStore((state) => state.createPlaylist);
  const favoriteTracks = favorites.map((id) => catalogIndexes.tracksById[id]).filter(Boolean);
  const recentTracks = recentlyPlayed.map((id) => catalogIndexes.tracksById[id]).filter(Boolean);

  return (
    <Screen>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
        <View style={{ flex: 1, gap: spacing.xs }}>
          <LumenText variant="hero">Library</LumenText>
          <LumenText muted>Your saved tracks, mixes, and recent Lumen sessions.</LumenText>
        </View>
        <IconButton icon={Plus} label="Create playlist" active onPress={() => createPlaylist(`Lumen Mix ${playlists.length + 1}`)} />
      </View>
      <SegmentedTabs
        value={tab}
        onChange={setTab}
        options={[
          { value: "favorites", label: "Favorites" },
          { value: "playlists", label: "Playlists" },
          { value: "recent", label: "Recent" }
        ]}
      />

      {tab === "favorites" ? (
        <View style={{ gap: spacing.md }}>
          {favoriteTracks.length ? (
            favoriteTracks.map((track, index) => <TrackCard key={track.id} track={track} queue={favoriteTracks.map((item) => item.id)} index={index} />)
          ) : (
            <EmptyState title="No favorites yet" body="Tap the heart beside a track to keep it close." />
          )}
        </View>
      ) : null}

      {tab === "playlists" ? (
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
          {playlists.map((playlist) => (
            <PlaylistTile key={playlist.id} playlist={playlist} />
          ))}
        </View>
      ) : null}

      {tab === "recent" ? (
        <View style={{ gap: spacing.md }}>
          {recentTracks.length ? (
            recentTracks.map((track, index) => <TrackCard key={track.id} track={track} queue={recentTracks.map((item) => item.id)} index={index} />)
          ) : (
            <EmptyState title="Nothing played yet" body="Start a track and Lumen will build your recent trail." />
          )}
        </View>
      ) : null}
    </Screen>
  );
}
