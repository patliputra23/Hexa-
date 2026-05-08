import { View } from "react-native";
import { catalogIndexes } from "@/data/mock-catalog";
import { usePlayerStore } from "@/state/player-store";
import { EmptyState, LumenText, QueueRow, Screen } from "@/ui/components";
import { spacing } from "@/ui/theme";

export default function QueueScreen() {
  const queue = usePlayerStore((state) => state.trackIds);
  const queueTracks = queue.map((id) => catalogIndexes.tracksById[id]).filter(Boolean);

  return (
    <Screen>
      <View style={{ gap: spacing.xs }}>
        <LumenText variant="hero">Queue</LumenText>
        <LumenText muted>Drag-ready rows and clean queue state for the player service.</LumenText>
      </View>

      {queueTracks.length ? (
        queueTracks.map((track, index) => <QueueRow key={`${track.id}-${index}`} track={track} index={index} />)
      ) : (
        <EmptyState title="Queue is empty" body="Play a track or album to build the next-up list." />
      )}
    </Screen>
  );
}
