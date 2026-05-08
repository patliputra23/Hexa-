import type { CatalogApi } from "@/types/interfaces";
import { albums, artists, catalogIndexes, tracks } from "./mock-catalog";

const wait = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

const normalize = (value: string) => value.trim().toLowerCase();

export const mockCatalogApi: CatalogApi = {
  async getHomeFeed() {
    await wait();
    return {
      featured: tracks.slice(0, 4),
      continueListening: [tracks[2], tracks[0]],
      recentlyPlayed: [tracks[4], tracks[1], tracks[3]],
      newAlbums: albums,
      artists
    };
  },
  async search(query) {
    await wait(120);
    const needle = normalize(query);
    if (!needle) {
      return { tracks, albums, artists };
    }

    return {
      tracks: tracks.filter((track) => normalize(track.title).includes(needle)),
      albums: albums.filter((album) => normalize(album.title).includes(needle)),
      artists: artists.filter((artist) => normalize(artist.name).includes(needle))
    };
  },
  async getTrack(id) {
    await wait(80);
    return catalogIndexes.tracksById[id] ?? null;
  },
  async getAlbum(id) {
    await wait(80);
    return catalogIndexes.albumsById[id] ?? null;
  },
  async getArtist(id) {
    await wait(80);
    return catalogIndexes.artistsById[id] ?? null;
  }
};

export function getArtistName(artistId: string) {
  return catalogIndexes.artistsById[artistId]?.name ?? "Unknown Artist";
}

export function getAlbumTitle(albumId: string) {
  return catalogIndexes.albumsById[albumId]?.title ?? "Unknown Album";
}

export function getTracksByIds(trackIds: string[]) {
  return trackIds.map((id) => catalogIndexes.tracksById[id]).filter(Boolean);
}
