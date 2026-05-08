import type {
  Album,
  AnalyticsEvent,
  AppSettings,
  Artist,
  DownloadState,
  Playlist,
  Track,
  UserProfile
} from "./music";

export type CatalogApi = {
  getHomeFeed(): Promise<{
    featured: Track[];
    continueListening: Track[];
    recentlyPlayed: Track[];
    newAlbums: Album[];
    artists: Artist[];
  }>;
  search(query: string): Promise<{ tracks: Track[]; albums: Album[]; artists: Artist[] }>;
  getTrack(id: string): Promise<Track | null>;
  getAlbum(id: string): Promise<Album | null>;
  getArtist(id: string): Promise<Artist | null>;
};

export type AuthProvider = {
  restoreSession(): Promise<UserProfile | null>;
  signIn(email: string, password: string): Promise<UserProfile>;
  signUp(name: string, email: string, password: string): Promise<UserProfile>;
  signOut(): Promise<void>;
};

export type PlaylistRepository = {
  list(userId: string): Promise<Playlist[]>;
  create(userId: string, title: string, description: string): Promise<Playlist>;
  update(playlist: Playlist): Promise<Playlist>;
  remove(id: string): Promise<void>;
};

export type FavoritesRepository = {
  list(userId: string): Promise<string[]>;
  toggleTrack(userId: string, trackId: string): Promise<string[]>;
};

export type PlaybackService = {
  play(trackId: string, queue?: string[]): Promise<void>;
  pause(): Promise<void>;
  seek(position: number): Promise<void>;
  next(): Promise<void>;
  previous(): Promise<void>;
};

export type OfflineTrackStore = {
  getDownload(trackId: string): Promise<DownloadState | null>;
  listDownloads(): Promise<DownloadState[]>;
  downloadTrack(trackId: string): Promise<DownloadState>;
  removeDownload(trackId: string): Promise<void>;
};

export type AnalyticsSink = {
  track(event: AnalyticsEvent): void;
  flush(): Promise<void>;
};

export type Logger = {
  info(message: string, context?: Record<string, unknown>): void;
  warn(message: string, context?: Record<string, unknown>): void;
  error(message: string, error?: unknown, context?: Record<string, unknown>): void;
};

export type SettingsRepository = {
  read(): Promise<AppSettings>;
  write(settings: AppSettings): Promise<AppSettings>;
};
