import { View } from "react-native";
import { Pause, Play, Repeat, Repeat1, Shuffle, SkipBack, SkipForward } from "lucide-react-native";
import { usePlayerStore } from "@/state/player-store";
import { spacing } from "@/ui/theme";
import { IconButton } from "./buttons";

export function PlayerControls({ large = false }: { large?: boolean }) {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const shuffle = usePlayerStore((state) => state.shuffle);
  const repeat = usePlayerStore((state) => state.repeat);
  const togglePlay = usePlayerStore((state) => state.togglePlay);
  const previous = usePlayerStore((state) => state.previous);
  const next = usePlayerStore((state) => state.next);
  const toggleShuffle = usePlayerStore((state) => state.toggleShuffle);
  const setRepeat = usePlayerStore((state) => state.setRepeat);
  const playSize = large ? 68 : 48;

  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.md, paddingHorizontal: spacing.md }}>
      <IconButton icon={Shuffle} label="Toggle shuffle" active={shuffle} onPress={toggleShuffle} />
      <IconButton icon={SkipBack} label="Previous track" onPress={previous} />
      <IconButton
        icon={isPlaying ? Pause : Play}
        label={isPlaying ? "Pause" : "Play"}
        active
        size={playSize}
        style={large ? { shadowOpacity: 0.3, shadowRadius: 18, shadowOffset: { width: 0, height: 10 }, elevation: 9 } : undefined}
        onPress={togglePlay}
      />
      <IconButton icon={SkipForward} label="Next track" onPress={next} />
      <IconButton
        icon={repeat === "one" ? Repeat1 : Repeat}
        label={`Repeat ${repeat}`}
        active={repeat !== "off"}
        onPress={() => setRepeat(repeat === "off" ? "all" : repeat === "all" ? "one" : "off")}
      />
    </View>
  );
}
