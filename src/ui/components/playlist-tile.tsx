import { Link } from "expo-router";
import { Pressable, View } from "react-native";
import type { Playlist } from "@/types/music";
import { colors, spacing } from "@/ui/theme";
import { Artwork } from "./artwork";
import { LumenText } from "./lumen-text";

export function PlaylistTile({ playlist }: { playlist: Playlist }) {
  return (
    <Link href={`/playlists/${playlist.id}`} asChild>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Open playlist ${playlist.title}`}
        style={{
          flex: 1,
          minWidth: 150,
          padding: spacing.md,
          gap: spacing.sm,
          borderRadius: 22,
          borderCurve: "continuous",
          backgroundColor: colors.graphiteRaised,
          borderWidth: 1,
          borderColor: colors.border
        }}
      >
        <Artwork token={playlist.title.slice(0, 2).toUpperCase()} color={playlist.color} size={96} />
        <View style={{ gap: 2 }}>
          <LumenText numberOfLines={1}>{playlist.title}</LumenText>
          <LumenText variant="caption" muted numberOfLines={2}>
            {playlist.trackIds.length} tracks - {playlist.description}
          </LumenText>
        </View>
      </Pressable>
    </Link>
  );
}
