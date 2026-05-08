import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Minus, Plus, Save, Trash2 } from "lucide-react-native";
import { catalogIndexes, tracks } from "@/data/mock-catalog";
import { useLibraryStore } from "@/state/library-store";
import { EmptyState, IconButton, LumenText, PrimaryButton, Screen, TextField, TrackCard } from "@/ui/components";
import { colors, spacing } from "@/ui/theme";

export default function PlaylistDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const playlist = useLibraryStore((state) => state.playlists.find((item) => item.id === id));
  const updatePlaylist = useLibraryStore((state) => state.updatePlaylist);
  const deletePlaylist = useLibraryStore((state) => state.deletePlaylist);
  const addTrackToPlaylist = useLibraryStore((state) => state.addTrackToPlaylist);
  const removeTrackFromPlaylist = useLibraryStore((state) => state.removeTrackFromPlaylist);
  const [title, setTitle] = useState(playlist?.title ?? "");
  const [description, setDescription] = useState(playlist?.description ?? "");

  useEffect(() => {
    setTitle(playlist?.title ?? "");
    setDescription(playlist?.description ?? "");
  }, [playlist]);

  if (!playlist) {
    return (
      <Screen>
        <EmptyState title="Playlist not found" body="This local mix may have been removed." />
      </Screen>
    );
  }

  const playlistTracks = playlist.trackIds.map((trackId) => catalogIndexes.tracksById[trackId]).filter(Boolean);
  const availableTracks = tracks.filter((track) => !playlist.trackIds.includes(track.id));

  return (
    <Screen>
      <View style={{ gap: spacing.xs }}>
        <LumenText variant="hero">{playlist.title}</LumenText>
        <LumenText muted>{playlist.trackIds.length} tracks - local editable mix</LumenText>
      </View>

      <View style={{ gap: spacing.md }}>
        <TextField label="Playlist title" value={title} onChangeText={setTitle} accessibilityLabel="Playlist title" />
        <TextField label="Description" value={description} onChangeText={setDescription} accessibilityLabel="Playlist description" />
        <View style={{ flexDirection: "row", gap: spacing.md }}>
          <PrimaryButton
            style={{ flex: 1 }}
            onPress={() => updatePlaylist({ ...playlist, title, description })}
            accessibilityLabel="Save playlist"
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
              <Save color={colors.graphite} size={18} />
              <LumenText style={{ color: colors.graphite, fontWeight: "800" }}>Save</LumenText>
            </View>
          </PrimaryButton>
          <IconButton icon={Trash2} label="Delete playlist" onPress={() => deletePlaylist(playlist.id)} />
        </View>
      </View>

      <LumenText variant="title">Tracks</LumenText>
      {playlistTracks.length ? (
        playlistTracks.map((track, index) => (
          <View key={track.id} style={{ gap: spacing.sm }}>
            <TrackCard track={track} queue={playlist.trackIds} index={index} />
            <PrimaryButton tone="quiet" onPress={() => removeTrackFromPlaylist(playlist.id, track.id)} accessibilityLabel={`Remove ${track.title}`}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
                <Minus color={colors.ivory} size={16} />
                <LumenText>Remove from mix</LumenText>
              </View>
            </PrimaryButton>
          </View>
        ))
      ) : (
        <EmptyState title="No tracks yet" body="Add an original demo track below to shape this mix." />
      )}

      <LumenText variant="title">Add tracks</LumenText>
      {availableTracks.map((track) => (
        <View key={track.id} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
          <View style={{ flex: 1 }}>
            <TrackCard track={track} compact />
          </View>
          <IconButton icon={Plus} label={`Add ${track.title}`} active onPress={() => addTrackToPlaylist(playlist.id, track.id)} />
        </View>
      ))}
    </Screen>
  );
}
