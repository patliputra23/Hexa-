import { useEffect, type PropsWithChildren } from "react";
import { Platform } from "react-native";
import Constants, { ExecutionEnvironment } from "expo-constants";
import { useAudioPlayer, requestNotificationPermissionsAsync, setAudioModeAsync } from "expo-audio";
import { audioAssets } from "@/data/audio-assets";
import { catalogIndexes } from "@/data/mock-catalog";
import { logger } from "@/logging/logger";
import { usePlayerStore } from "@/state/player-store";

type LockScreenPlayer = ReturnType<typeof useAudioPlayer> & {
  setActiveForLockScreen?: (active: boolean) => void;
  replace?: (source: number) => void;
};

export function AudioProvider({ children }: PropsWithChildren) {
  const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;
  const currentTrackId = usePlayerStore((state) => state.currentTrackId);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const seekPosition = usePlayerStore((state) => state.position);
  const setProgress = usePlayerStore((state) => state.setProgress);
  const setBuffering = usePlayerStore((state) => state.setBuffering);
  const setError = usePlayerStore((state) => state.setError);
  const next = usePlayerStore((state) => state.next);
  const track = currentTrackId ? catalogIndexes.tracksById[currentTrackId] : null;
  const source = track ? audioAssets[track.audioAssetKey] : audioAssets.auroraCircuit;
  const player = useAudioPlayer(source, { updateInterval: 250 }) as LockScreenPlayer;

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      // Expo Go does not reliably provide the background playback service/lock-screen integration.
      // Keep playback working in the foreground and avoid starting background services to prevent warnings.
      shouldPlayInBackground: !isExpoGo,
      // Required for lock-screen controls to activate correctly when background playback is enabled.
      interruptionMode: !isExpoGo ? "doNotMix" : "duckOthers"
    }).catch((error) => {
      logger.error("Failed to configure audio mode", error);
      setError("Audio mode could not be configured.");
    });
  }, [isExpoGo, setError]);

  useEffect(() => {
    if (track && player.replace) {
      player.replace(source);
    }
  }, [player, source, track]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        if (!isExpoGo) {
          // Avoid lock-screen control warnings on Android by ensuring notification permission is granted.
          if (Platform.OS === "android") {
            await requestNotificationPermissionsAsync().catch(() => {
              /* Permission prompts are handled by native; failure just means lock-screen controls may be unavailable. */
            });
          }

          if (!cancelled) {
            player.setActiveForLockScreen?.(Boolean(track && isPlaying));
          }
        }

        if (cancelled) return;
        if (isPlaying && track) {
          player.play();
        } else {
          player.pause();
        }
      } catch (error) {
        logger.error("Audio playback command failed", error, { trackId: currentTrackId });
        setError("Playback stopped unexpectedly.");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [currentTrackId, isPlaying, isExpoGo, player, setError, track]);

  useEffect(() => {
    const id = setInterval(() => {
      setBuffering(Boolean(player.isBuffering));
      if (!track) {
        return;
      }

      const duration = Number.isFinite(player.duration) && player.duration > 0 ? player.duration : track.duration;
      const currentTime = Number.isFinite(player.currentTime) ? player.currentTime : seekPosition;
      setProgress(currentTime, duration);

      if (isPlaying && duration > 0 && currentTime >= duration - 0.35) {
        next();
      }
    }, 500);

    return () => clearInterval(id);
  }, [isPlaying, next, player.currentTime, player.duration, player.isBuffering, seekPosition, setBuffering, setProgress, track]);

  useEffect(() => {
    if (Math.abs((player.currentTime ?? 0) - seekPosition) > 1.2) {
      player.seekTo(seekPosition).catch((error: unknown) => logger.warn("Seek command failed", { error: String(error) }));
    }
  }, [player, seekPosition]);

  return <>{children}</>;
}
