import { Link } from "expo-router";
import { Pressable, View } from "react-native";
import { getArtistName } from "@/data/catalog-api";
import type { Album } from "@/types/music";
import { spacing } from "@/ui/theme";
import { Artwork } from "./artwork";
import { LumenText } from "./lumen-text";

export function AlbumCard({ album }: { album: Album }) {
  return (
    <Link href={`/album/${album.id}`} asChild>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Open album ${album.title}`}
        style={{ width: 148, gap: spacing.sm }}
      >
        <Artwork token={album.artworkToken} color={album.color} size={148} />
        <View style={{ gap: 2 }}>
          <LumenText numberOfLines={1}>{album.title}</LumenText>
          <LumenText variant="caption" muted numberOfLines={1}>
            {getArtistName(album.artistId)}
          </LumenText>
        </View>
      </Pressable>
    </Link>
  );
}
