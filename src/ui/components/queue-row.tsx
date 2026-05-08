import { View } from "react-native";
import { GripVertical, Play } from "lucide-react-native";
import { getArtistName } from "@/data/catalog-api";
import { usePlayerStore } from "@/state/player-store";
import type { Track } from "@/types/music";
import { colors, spacing } from "@/ui/theme";
import { Artwork } from "./artwork";
import { IconButton } from "./buttons";
import { LumenText } from "./lumen-text";

export function QueueRow({ track, index }: { track: Track; index: number }) {
  const startTrack = usePlayerStore((state) => state.startTrack);
  const queue = usePlayerStore((state) => state.trackIds);
  const active = usePlayerStore((state) => state.currentTrackId === track.id);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        padding: spacing.sm,
        borderRadius: 18,
        backgroundColor: active ? "rgba(247, 178, 103, 0.12)" : colors.graphiteRaised,
        borderWidth: 1,
        borderColor: active ? "rgba(247, 178, 103, 0.45)" : colors.border
      }}
    >
      <GripVertical color={colors.ivoryMuted} size={18} />
      <Artwork token={track.artworkToken} color={track.color} size={48} />
      <View style={{ flex: 1 }}>
        <LumenText numberOfLines={1}>
          {index + 1}. {track.title}
        </LumenText>
        <LumenText variant="caption" muted numberOfLines={1}>
          {getArtistName(track.artistId)}
        </LumenText>
      </View>
      <IconButton icon={Play} label={`Play ${track.title}`} active={active} size={40} onPress={() => startTrack(track.id, queue)} />
    </View>
  );
}
