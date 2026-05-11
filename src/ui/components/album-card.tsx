import { Link } from "expo-router";
import { Pressable, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { getArtistName } from "@/data/catalog-api";
import type { Album } from "@/types/music";
import { spacing } from "@/ui/theme";
import { Artwork } from "./artwork";
import { LumenText } from "./lumen-text";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function AlbumCard({ album }: { album: Album }) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  return (
    <Link href={`/album/${album.id}`} asChild>
      <AnimatedPressable
        accessibilityRole="button"
        accessibilityLabel={`Open album ${album.title}`}
        onPressIn={() => {
          scale.value = withSpring(0.98, { damping: 18, stiffness: 260 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 18, stiffness: 260 });
        }}
        style={[animatedStyle, { width: 148, gap: spacing.sm }]}
      >
        <Artwork token={album.artworkToken} color={album.color} size={148} />
        <View style={{ gap: 2 }}>
          <LumenText numberOfLines={1}>{album.title}</LumenText>
          <LumenText variant="caption" muted numberOfLines={1}>
            {getArtistName(album.artistId)}
          </LumenText>
        </View>
      </AnimatedPressable>
    </Link>
  );
}
