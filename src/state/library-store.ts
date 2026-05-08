import { create } from "zustand";
import { playlists as systemPlaylists } from "@/data/mock-catalog";
import { offlineTrackStore } from "@/offline/offline-store";
import { storage } from "@/storage/local-storage";
import { trackEvent } from "@/analytics/analytics";
import type { DownloadState, FavoriteState, Playlist } from "@/types/music";

const FAVORITES_KEY = "lumen.library.favorites";
const PLAYLISTS_KEY = "lumen.library.playlists";
const RECENT_KEY = "lumen.library.recent";
const CONTINUE_KEY = "lumen.library.continue";

type LibraryStore = {
  favorites: FavoriteState;
  playlists: Playlist[];
  downloads: Record<string, DownloadState>;
  recentlyPlayed: string[];
  continueListening: string[];
  isOffline: boolean;
  toggleFavoriteTrack: (trackId: string) => void;
  isFavoriteTrack: (trackId: string) => boolean;
  createPlaylist: (title: string, description?: string) => Playlist;
  updatePlaylist: (playlist: Playlist) => void;
  deletePlaylist: (playlistId: string) => void;
  addTrackToPlaylist: (playlistId: string, trackId: string) => void;
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => void;
  addRecentlyPlayed: (trackId: string) => void;
  markContinueListening: (trackId: string) => void;
  hydrateDownloads: () => Promise<void>;
  downloadTrack: (trackId: string) => Promise<void>;
  removeDownload: (trackId: string) => Promise<void>;
  setOffline: (isOffline: boolean) => void;
};

const defaultFavorites: FavoriteState = { trackIds: [], albumIds: [], artistIds: [] };

function savePlaylists(playlists: Playlist[]) {
  storage.set(PLAYLISTS_KEY, playlists);
}

export const useLibraryStore = create<LibraryStore>((set, get) => ({
  favorites: storage.get(FAVORITES_KEY, defaultFavorites),
  playlists: storage.get(PLAYLISTS_KEY, systemPlaylists),
  downloads: {},
  recentlyPlayed: storage.get(RECENT_KEY, []),
  continueListening: storage.get(CONTINUE_KEY, ["track-glass-harbor", "track-aurora-circuit"]),
  isOffline: false,
  toggleFavoriteTrack(trackId) {
    const favorites = get().favorites;
    const exists = favorites.trackIds.includes(trackId);
    const next = {
      ...favorites,
      trackIds: exists
        ? favorites.trackIds.filter((id) => id !== trackId)
        : [trackId, ...favorites.trackIds]
    };
    storage.set(FAVORITES_KEY, next);
    set({ favorites: next });
    trackEvent(exists ? "favorite_remove" : "favorite_add", { trackId });
  },
  isFavoriteTrack(trackId) {
    return get().favorites.trackIds.includes(trackId);
  },
  createPlaylist(title, description = "A new Lumen mix.") {
    const now = new Date().toISOString();
    const playlist: Playlist = {
      id: `playlist-${Date.now()}`,
      title: title.trim() || "Untitled Mix",
      description,
      ownerId: "local-user",
      trackIds: [],
      createdAt: now,
      updatedAt: now,
      color: "#F7B267"
    };
    const playlists = [playlist, ...get().playlists];
    savePlaylists(playlists);
    set({ playlists });
    trackEvent("playlist_create", { playlistId: playlist.id });
    return playlist;
  },
  updatePlaylist(playlist) {
    const playlists = get().playlists.map((item) =>
      item.id === playlist.id ? { ...playlist, updatedAt: new Date().toISOString() } : item
    );
    savePlaylists(playlists);
    set({ playlists });
  },
  deletePlaylist(playlistId) {
    const playlists = get().playlists.filter((playlist) => playlist.id !== playlistId);
    savePlaylists(playlists);
    set({ playlists });
    trackEvent("playlist_delete", { playlistId });
  },
  addTrackToPlaylist(playlistId, trackId) {
    const playlists = get().playlists.map((playlist) => {
      if (playlist.id !== playlistId || playlist.trackIds.includes(trackId)) {
        return playlist;
      }

      return {
        ...playlist,
        trackIds: [...playlist.trackIds, trackId],
        updatedAt: new Date().toISOString()
      };
    });
    savePlaylists(playlists);
    set({ playlists });
    trackEvent("playlist_track_add", { playlistId, trackId });
  },
  removeTrackFromPlaylist(playlistId, trackId) {
    const playlists = get().playlists.map((playlist) =>
      playlist.id === playlistId
        ? {
            ...playlist,
            trackIds: playlist.trackIds.filter((id) => id !== trackId),
            updatedAt: new Date().toISOString()
          }
        : playlist
    );
    savePlaylists(playlists);
    set({ playlists });
    trackEvent("playlist_track_remove", { playlistId, trackId });
  },
  addRecentlyPlayed(trackId) {
    const recentlyPlayed = [trackId, ...get().recentlyPlayed.filter((id) => id !== trackId)].slice(0, 12);
    storage.set(RECENT_KEY, recentlyPlayed);
    set({ recentlyPlayed });
  },
  markContinueListening(trackId) {
    const continueListening = [trackId, ...get().continueListening.filter((id) => id !== trackId)].slice(0, 8);
    storage.set(CONTINUE_KEY, continueListening);
    set({ continueListening });
  },
  async hydrateDownloads() {
    const downloads = await offlineTrackStore.listDownloads();
    set({
      downloads: Object.fromEntries(downloads.map((download) => [download.trackId, download]))
    });
  },
  async downloadTrack(trackId) {
    set((state) => ({
      downloads: {
        ...state.downloads,
        [trackId]: { trackId, status: "downloading", progress: 0.35 }
      }
    }));
    const download = await offlineTrackStore.downloadTrack(trackId);
    set((state) => ({
      downloads: {
        ...state.downloads,
        [trackId]: download
      }
    }));
    trackEvent("download_track", { trackId, status: download.status });
  },
  async removeDownload(trackId) {
    await offlineTrackStore.removeDownload(trackId);
    const { [trackId]: _removed, ...downloads } = get().downloads;
    set({ downloads });
    trackEvent("download_remove", { trackId });
  },
  setOffline(isOffline) {
    set({ isOffline });
  }
}));
