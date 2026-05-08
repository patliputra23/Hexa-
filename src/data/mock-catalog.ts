import type { Album, Artist, Playlist, Track } from "@/types/music";

export const artists: Artist[] = [
  {
    id: "artist-mara-vale",
    name: "Mara Vale",
    bio: "Architect of soft electronic pieces that bloom slowly and leave plenty of air around the pulse.",
    monthlyListeners: 184200,
    imageToken: "MV",
    color: "#F7B267"
  },
  {
    id: "artist-oriel-park",
    name: "Oriel Park",
    bio: "A duo building tactile instrumentals from modular keys, brushed percussion, and late-window ambience.",
    monthlyListeners: 98200,
    imageToken: "OP",
    color: "#2EC4B6"
  },
  {
    id: "artist-nova-lane",
    name: "Nova Lane",
    bio: "Clean nocturnal pop sketches with bright hooks, elastic bass, and no borrowed catalog assets.",
    monthlyListeners: 241500,
    imageToken: "NL",
    color: "#E76F51"
  }
];

export const albums: Album[] = [
  {
    id: "album-afterimage",
    title: "Afterimage Rooms",
    artistId: "artist-mara-vale",
    releaseYear: 2026,
    artworkToken: "AR",
    color: "#F7B267",
    trackIds: ["track-aurora-circuit", "track-paper-moons"]
  },
  {
    id: "album-glass-harbor",
    title: "Glass Harbor",
    artistId: "artist-oriel-park",
    releaseYear: 2025,
    artworkToken: "GH",
    color: "#2EC4B6",
    trackIds: ["track-glass-harbor", "track-low-sun-relay"]
  },
  {
    id: "album-violet-signal",
    title: "Violet Signal",
    artistId: "artist-nova-lane",
    releaseYear: 2026,
    artworkToken: "VS",
    color: "#C77DFF",
    trackIds: ["track-violet-signal"]
  }
];

export const tracks: Track[] = [
  {
    id: "track-aurora-circuit",
    title: "Aurora Circuit",
    artistId: "artist-mara-vale",
    albumId: "album-afterimage",
    duration: 18,
    mood: "lift",
    explicit: false,
    licenseStatus: "licensed-demo",
    isDownloadable: true,
    audioAssetKey: "auroraCircuit",
    artworkToken: "AC",
    color: "#F7B267"
  },
  {
    id: "track-paper-moons",
    title: "Paper Moons",
    artistId: "artist-mara-vale",
    albumId: "album-afterimage",
    duration: 16,
    mood: "quiet",
    explicit: false,
    licenseStatus: "licensed-demo",
    isDownloadable: true,
    audioAssetKey: "paperMoons",
    artworkToken: "PM",
    color: "#FFD166"
  },
  {
    id: "track-glass-harbor",
    title: "Glass Harbor",
    artistId: "artist-oriel-park",
    albumId: "album-glass-harbor",
    duration: 20,
    mood: "afterglow",
    explicit: false,
    licenseStatus: "licensed-demo",
    isDownloadable: true,
    audioAssetKey: "glassHarbor",
    artworkToken: "GH",
    color: "#2EC4B6"
  },
  {
    id: "track-low-sun-relay",
    title: "Low Sun Relay",
    artistId: "artist-oriel-park",
    albumId: "album-glass-harbor",
    duration: 17,
    mood: "drive",
    explicit: false,
    licenseStatus: "licensed-demo",
    isDownloadable: false,
    audioAssetKey: "lowSunRelay",
    artworkToken: "LS",
    color: "#EF476F"
  },
  {
    id: "track-violet-signal",
    title: "Violet Signal",
    artistId: "artist-nova-lane",
    albumId: "album-violet-signal",
    duration: 19,
    mood: "pulse",
    explicit: false,
    licenseStatus: "licensed-demo",
    isDownloadable: true,
    audioAssetKey: "violetSignal",
    artworkToken: "VS",
    color: "#C77DFF"
  }
];

export const playlists: Playlist[] = [
  {
    id: "playlist-after-dark",
    title: "After Dark Focus",
    description: "Low-glare instrumentals for late work and small rituals.",
    ownerId: "system",
    trackIds: ["track-glass-harbor", "track-paper-moons", "track-aurora-circuit"],
    createdAt: "2026-01-02T18:00:00.000Z",
    updatedAt: "2026-01-02T18:00:00.000Z",
    color: "#2EC4B6"
  },
  {
    id: "playlist-radiant-drive",
    title: "Radiant Drive",
    description: "Clean motion, warm accents, and just enough tempo.",
    ownerId: "system",
    trackIds: ["track-low-sun-relay", "track-violet-signal", "track-aurora-circuit"],
    createdAt: "2026-01-04T18:00:00.000Z",
    updatedAt: "2026-01-04T18:00:00.000Z",
    color: "#F7B267"
  }
];

export const catalogIndexes = {
  tracksById: Object.fromEntries(tracks.map((track) => [track.id, track])),
  albumsById: Object.fromEntries(albums.map((album) => [album.id, album])),
  artistsById: Object.fromEntries(artists.map((artist) => [artist.id, artist]))
} as const;
