export type Mood =
  | "focus"
  | "afterglow"
  | "drive"
  | "pulse"
  | "quiet"
  | "lift";

export type LicenseStatus = "licensed-demo" | "streaming-only";

export type AudioAssetKey =
  | "auroraCircuit"
  | "glassHarbor"
  | "lowSunRelay"
  | "paperMoons"
  | "violetSignal";

export type Track = {
  id: string;
  title: string;
  artistId: string;
  albumId: string;
  duration: number;
  mood: Mood;
  explicit: boolean;
  licenseStatus: LicenseStatus;
  isDownloadable: boolean;
  audioAssetKey: AudioAssetKey;
  artworkToken: string;
  color: string;
};

export type Album = {
  id: string;
  title: string;
  artistId: string;
  releaseYear: number;
  artworkToken: string;
  color: string;
  trackIds: string[];
};

export type Artist = {
  id: string;
  name: string;
  bio: string;
  monthlyListeners: number;
  imageToken: string;
  color: string;
};

export type Playlist = {
  id: string;
  title: string;
  description: string;
  ownerId: string;
  trackIds: string[];
  createdAt: string;
  updatedAt: string;
  color: string;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  avatarToken: string;
  plan: "demo-premium" | "free";
  createdAt: string;
};

export type RepeatMode = "off" | "one" | "all";

export type PlaybackState = {
  currentTrackId: string | null;
  isPlaying: boolean;
  position: number;
  duration: number;
  shuffle: boolean;
  repeat: RepeatMode;
  isBuffering: boolean;
  error: string | null;
};

export type QueueState = {
  trackIds: string[];
  activeIndex: number;
};

export type DownloadStatus = "idle" | "queued" | "downloading" | "downloaded" | "failed";

export type DownloadState = {
  trackId: string;
  status: DownloadStatus;
  progress: number;
  localUri?: string;
  error?: string;
};

export type FavoriteState = {
  trackIds: string[];
  albumIds: string[];
  artistIds: string[];
};

export type AppSettings = {
  streamingQuality: "balanced" | "high";
  downloadOnWifiOnly: boolean;
  crossfadeSeconds: number;
  reduceMotion: boolean;
  analyticsEnabled: boolean;
  crashLoggingEnabled: boolean;
};

export type AnalyticsEvent = {
  name: string;
  properties?: Record<string, string | number | boolean | null>;
  timestamp: string;
};
