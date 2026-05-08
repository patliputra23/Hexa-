import { View } from "react-native";
import { WifiOff } from "lucide-react-native";
import { tracks } from "@/data/mock-catalog";
import { useLibraryStore } from "@/state/library-store";
import { IconButton, LumenText, Screen, TrackCard } from "@/ui/components";
import { colors, spacing } from "@/ui/theme";

export default function DownloadsScreen() {
  const downloads = useLibraryStore((state) => state.downloads);
  const isOffline = useLibraryStore((state) => state.isOffline);
  const setOffline = useLibraryStore((state) => state.setOffline);
  const downloadedIds = Object.values(downloads)
    .filter((download) => download.status === "downloaded")
    .map((download) => download.trackId);
  const downloadedTracks = tracks.filter((track) => downloadedIds.includes(track.id));

  return (
    <Screen>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
        <View style={{ flex: 1, gap: spacing.xs }}>
          <LumenText variant="hero">Downloads</LumenText>
          <LumenText muted>Offline access is limited to licensed demo tracks.</LumenText>
        </View>
        <IconButton icon={WifiOff} label="Toggle offline mode" active={isOffline} onPress={() => setOffline(!isOffline)} />
      </View>

      <View
        style={{
          padding: spacing.lg,
          gap: spacing.sm,
          borderRadius: 24,
          borderCurve: "continuous",
          backgroundColor: colors.graphiteRaised,
          borderWidth: 1,
          borderColor: colors.border
        }}
      >
        <LumenText variant="title">{downloadedTracks.length} saved tracks</LumenText>
        <LumenText muted>Cache markers live in app storage. Demo audio remains bundled and original.</LumenText>
      </View>

      <LumenText variant="title">Available for offline</LumenText>
      {tracks.map((track, index) => (
        <TrackCard key={track.id} track={track} queue={tracks.map((item) => item.id)} index={index} />
      ))}
    </Screen>
  );
}
