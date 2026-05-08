import { create } from "zustand";
import { catalogIndexes, tracks } from "@/data/mock-catalog";
import { trackEvent } from "@/analytics/analytics";
import { useLibraryStore } from "./library-store";
import type { PlaybackState, QueueState, RepeatMode } from "@/types/music";

type PlayerStore = PlaybackState &
  QueueState & {
    startTrack: (trackId: string, queue?: string[]) => void;
    togglePlay: () => void;
    pause: () => void;
    seek: (position: number) => void;
    next: () => void;
    previous: () => void;
    toggleShuffle: () => void;
    setRepeat: (repeat: RepeatMode) => void;
    setBuffering: (isBuffering: boolean) => void;
    setProgress: (position: number, duration?: number) => void;
    setError: (error: string | null) => void;
  };

const defaultQueue = tracks.map((track) => track.id);

function durationFor(trackId: string | null) {
  return trackId ? catalogIndexes.tracksById[trackId]?.duration ?? 0 : 0;
}

function nextIndex(state: QueueState & Pick<PlaybackState, "shuffle" | "repeat">) {
  if (state.repeat === "one") {
    return state.activeIndex;
  }

  if (state.shuffle && state.trackIds.length > 1) {
    const candidates = state.trackIds.map((_, index) => index).filter((index) => index !== state.activeIndex);
    return candidates[Math.floor(Math.random() * candidates.length)] ?? state.activeIndex;
  }

  if (state.activeIndex + 1 >= state.trackIds.length) {
    return state.repeat === "all" ? 0 : state.activeIndex;
  }

  return state.activeIndex + 1;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentTrackId: null,
  isPlaying: false,
  position: 0,
  duration: 0,
  shuffle: false,
  repeat: "off",
  isBuffering: false,
  error: null,
  trackIds: defaultQueue,
  activeIndex: 0,
  startTrack(trackId, queue = defaultQueue) {
    const trackIds = queue.length ? queue : defaultQueue;
    const activeIndex = Math.max(0, trackIds.indexOf(trackId));
    set({
      currentTrackId: trackId,
      trackIds,
      activeIndex,
      isPlaying: true,
      position: 0,
      duration: durationFor(trackId),
      error: null
    });
    useLibraryStore.getState().addRecentlyPlayed(trackId);
    trackEvent("playback_start", { trackId });
  },
  togglePlay() {
    const { currentTrackId, isPlaying } = get();
    const fallbackTrackId = currentTrackId ?? defaultQueue[0];
    if (!currentTrackId && fallbackTrackId) {
      get().startTrack(fallbackTrackId, defaultQueue);
      return;
    }

    set({ isPlaying: !isPlaying });
    trackEvent(isPlaying ? "playback_pause" : "playback_resume", { trackId: currentTrackId });
  },
  pause() {
    set({ isPlaying: false });
  },
  seek(position) {
    const bounded = Math.max(0, Math.min(position, get().duration));
    set({ position: bounded });
    trackEvent("playback_seek", { position: bounded, trackId: get().currentTrackId });
  },
  next() {
    const state = get();
    const activeIndex = nextIndex(state);
    const trackId = state.trackIds[activeIndex];
    if (!trackId || trackId === state.currentTrackId) {
      set({ position: 0 });
      return;
    }

    set({
      activeIndex,
      currentTrackId: trackId,
      position: 0,
      duration: durationFor(trackId),
      isPlaying: true,
      error: null
    });
    useLibraryStore.getState().addRecentlyPlayed(trackId);
    trackEvent("playback_next", { trackId });
  },
  previous() {
    const state = get();
    if (state.position > 4) {
      set({ position: 0 });
      return;
    }

    const activeIndex = Math.max(0, state.activeIndex - 1);
    const trackId = state.trackIds[activeIndex];
    set({
      activeIndex,
      currentTrackId: trackId ?? state.currentTrackId,
      position: 0,
      duration: durationFor(trackId ?? state.currentTrackId),
      isPlaying: true,
      error: null
    });
    trackEvent("playback_previous", { trackId: trackId ?? state.currentTrackId });
  },
  toggleShuffle() {
    set((state) => ({ shuffle: !state.shuffle }));
  },
  setRepeat(repeat) {
    set({ repeat });
  },
  setBuffering(isBuffering) {
    set({ isBuffering });
  },
  setProgress(position, duration) {
    set({
      position,
      duration: duration ?? get().duration
    });
  },
  setError(error) {
    set({ error, isPlaying: false });
  }
}));
