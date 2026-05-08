import { Link } from "expo-router";
import { Pressable, View } from "react-native";
import type { Artist } from "@/types/music";
import { colors, spacing } from "@/ui/theme";
import { formatCompact } from "@/ui/utils/format";
import { Artwork } from "./artwork";
import { LumenText } from "./lumen-text";

export function ArtistChip({ artist }: { artist: Artist }) {
  return (
    <Link href={`/artist/${artist.id}`} asChild>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Open artist ${artist.name}`}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing.md,
          padding: spacing.md,
          borderRadius: 20,
          borderCurve: "continuous",
          backgroundColor: colors.graphiteRaised,
          borderWidth: 1,
          borderColor: colors.border
        }}
      >
        <Artwork token={artist.imageToken} color={artist.color} size={54} />
        <View style={{ flex: 1 }}>
          <LumenText>{artist.name}</LumenText>
          <LumenText variant="caption" muted>
            {formatCompact(artist.monthlyListeners)} listeners
          </LumenText>
        </View>
      </Pressable>
    </Link>
  );
}
