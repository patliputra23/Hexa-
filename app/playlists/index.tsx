import { View } from "react-native";
import { Plus } from "lucide-react-native";
import { useLibraryStore } from "@/state/library-store";
import { IconButton, LumenText, PlaylistTile, Screen } from "@/ui/components";
import { spacing } from "@/ui/theme";

export default function PlaylistsScreen() {
  const playlists = useLibraryStore((state) => state.playlists);
  const createPlaylist = useLibraryStore((state) => state.createPlaylist);

  return (
    <Screen>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
        <View style={{ flex: 1, gap: spacing.xs }}>
          <LumenText variant="hero">Playlists</LumenText>
          <LumenText muted>Create and edit local Lumen mixes.</LumenText>
        </View>
        <IconButton icon={Plus} label="Create playlist" active onPress={() => createPlaylist(`Lumen Mix ${playlists.length + 1}`)} />
      </View>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
        {playlists.map((playlist) => (
          <PlaylistTile key={playlist.id} playlist={playlist} />
        ))}
      </View>
    </Screen>
  );
}
