import { Link, router } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { Easing, cancelAnimation, runOnJS, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { Heart, ListMusic } from "lucide-react-native";
import { catalogIndexes, tracks } from "@/data/mock-catalog";
import { getAlbumTitle, getArtistName } from "@/data/catalog-api";
import { useLibraryStore } from "@/state/library-store";
import { usePlayerStore } from "@/state/player-store";
import {
  Artwork,
  DownloadButton,
  EmptyState,
  IconButton,
  LumenText,
  PlayerControls,
  PrimaryButton,
  ProgressScrubber,
  Screen
} from "@/ui/components";
import { colors, spacing } from "@/ui/theme";

export default function PlayerScreen() {
  const currentTrackId = usePlayerStore((state) => state.currentTrackId);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const startTrack = usePlayerStore((state) => state.startTrack);
  const position = usePlayerStore((state) => state.position);
  const duration = usePlayerStore((state) => state.duration);
  const seek = usePlayerStore((state) => state.seek);
  const error = usePlayerStore((state) => state.error);
  const previous = usePlayerStore((state) => state.previous);
  const next = usePlayerStore((state) => state.next);
  const isFavorite = useLibraryStore((state) => (currentTrackId ? state.isFavoriteTrack(currentTrackId) : false));
  const toggleFavoriteTrack = useLibraryStore((state) => state.toggleFavoriteTrack);
  const track = currentTrackId ? catalogIndexes.tracksById[currentTrackId] : null;
  const rotate = useSharedValue(0);

  const artStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }]
  }));

  const barA = useSharedValue(0.45);
  const barB = useSharedValue(0.65);
  const barC = useSharedValue(0.5);
  const barStyleA = useAnimatedStyle(() => ({ transform: [{ scaleY: barA.value }] }));
  const barStyleB = useAnimatedStyle(() => ({ transform: [{ scaleY: barB.value }] }));
  const barStyleC = useAnimatedStyle(() => ({ transform: [{ scaleY: barC.value }] }));

  const swipeGesture = Gesture.Pan().onEnd((event) => {
    if (event.translationX > 58) {
      runOnJS(previous)();
      return;
    }
    if (event.translationX < -58) {
      runOnJS(next)();
      return;
    }
    if (event.translationY > 72) {
      runOnJS(router.back)();
    }
  });

  useEffect(() => {
    if (isPlaying) {
      rotate.value = 0;
      rotate.value = withRepeat(withTiming(360, { duration: 24000, easing: Easing.linear }), -1, false);
      barA.value = withRepeat(withTiming(1, { duration: 620, easing: Easing.inOut(Easing.ease) }), -1, true);
      barB.value = withRepeat(withTiming(1, { duration: 740, easing: Easing.inOut(Easing.ease) }), -1, true);
      barC.value = withRepeat(withTiming(1, { duration: 680, easing: Easing.inOut(Easing.ease) }), -1, true);
      return;
    }

    cancelAnimation(rotate);
    cancelAnimation(barA);
    cancelAnimation(barB);
    cancelAnimation(barC);
    barA.value = withTiming(0.45, { duration: 220 });
    barB.value = withTiming(0.65, { duration: 220 });
    barC.value = withTiming(0.5, { duration: 220 });
  }, [barA, barB, barC, isPlaying, rotate]);

  if (!track) {
    return (
      <Screen>
        <EmptyState
          title="Nothing playing"
          body="Start with Lumen's first original demo track."
          actionLabel="Play Aurora Circuit"
          onAction={() => startTrack(tracks[0].id, tracks.map((item) => item.id))}
        />
      </Screen>
    );
  }

  return (
    <GestureDetector gesture={swipeGesture}>
      <Screen>
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: 84,
            alignSelf: "center",
            width: 380,
            height: 380,
            borderRadius: 999,
            backgroundColor: track.color,
            opacity: 0.12
          }}
        />
      <View style={{ alignItems: "center", gap: spacing.xl }}>
        <Animated.View style={artStyle}>
          <Artwork token={track.artworkToken} color={track.color} size={260} />
        </Animated.View>
        <View style={{ alignItems: "center", gap: spacing.xs }}>
          <LumenText variant="hero" style={{ textAlign: "center" }}>
            {track.title}
          </LumenText>
          <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.xs }}>
            <LumenText style={{ color: colors.teal }}>{getArtistName(track.artistId)}</LumenText>
            <View style={{ flexDirection: "row", alignItems: "flex-end", gap: 3, height: 11 }}>
              <Animated.View style={[{ width: 3, height: 9, borderRadius: 6, backgroundColor: colors.teal }, barStyleA]} />
              <Animated.View style={[{ width: 3, height: 11, borderRadius: 6, backgroundColor: colors.teal }, barStyleB]} />
              <Animated.View style={[{ width: 3, height: 8, borderRadius: 6, backgroundColor: colors.teal }, barStyleC]} />
            </View>
          </View>
          <LumenText variant="caption" muted>
            {getAlbumTitle(track.albumId)} - {track.licenseStatus}
          </LumenText>
        </View>
      </View>

      {error ? (
        <LumenText selectable style={{ color: colors.danger, textAlign: "center" }}>
          {error}
        </LumenText>
      ) : null}

      <View style={{ marginTop: spacing.md, marginBottom: spacing.xs }}>
        <ProgressScrubber position={position} duration={duration || track.duration} onSeek={seek} />
      </View>
      <PlayerControls large />

      <View style={{ flexDirection: "row", justifyContent: "center", gap: spacing.md }}>
        <IconButton
          icon={Heart}
          label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          active={isFavorite}
          onPress={() => toggleFavoriteTrack(track.id)}
        />
        <DownloadButton trackId={track.id} isDownloadable={track.isDownloadable} />
        <Link href="/queue" asChild>
          <IconButton icon={ListMusic} label="Open queue" />
        </Link>
      </View>

      <Link href={`/album/${track.albumId}`} asChild>
        <PrimaryButton tone="quiet" accessibilityLabel="View album">
          View album
        </PrimaryButton>
      </Link>
      </Screen>
    </GestureDetector>
  );
}
