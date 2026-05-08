import * as FileSystem from "expo-file-system/legacy";
import type { OfflineTrackStore } from "@/types/interfaces";
import type { DownloadState } from "@/types/music";
import { catalogIndexes } from "@/data/mock-catalog";
import { storage } from "@/storage/local-storage";

const DOWNLOAD_KEY = "lumen.offline.downloads";
const DOWNLOAD_DIR_NAME = "lumen-tracks";

function getDownloadDirUri() {
  if (!FileSystem.documentDirectory) {
    throw new Error("Document directory is unavailable.");
  }
  return `${FileSystem.documentDirectory}${DOWNLOAD_DIR_NAME}/`;
}

function getMarkerUri(trackId: string) {
  return `${getDownloadDirUri()}${trackId}.license`;
}

function allDownloads() {
  return storage.get<DownloadState[]>(DOWNLOAD_KEY, []);
}

function saveDownloads(downloads: DownloadState[]) {
  storage.set(DOWNLOAD_KEY, downloads);
}

function upsertDownload(download: DownloadState) {
  const downloads = allDownloads().filter((item) => item.trackId !== download.trackId);
  saveDownloads([...downloads, download]);
  return download;
}

export const offlineTrackStore: OfflineTrackStore = {
  async getDownload(trackId) {
    return allDownloads().find((item) => item.trackId === trackId) ?? null;
  },
  async listDownloads() {
    return allDownloads();
  },
  async downloadTrack(trackId) {
    const track = catalogIndexes.tracksById[trackId];
    if (!track) {
      throw new Error("Track not found.");
    }

    if (!track.isDownloadable) {
      return upsertDownload({
        trackId,
        status: "failed",
        progress: 0,
        error: "This demo license is streaming-only."
      });
    }

    const downloadDirUri = getDownloadDirUri();
    const cacheMarkerUri = getMarkerUri(trackId);
    await FileSystem.makeDirectoryAsync(downloadDirUri, { intermediates: true });
    await FileSystem.writeAsStringAsync(
      cacheMarkerUri,
      `Lumen licensed demo cache marker for ${track.title}. Audio remains bundled in app assets.`
    );

    return upsertDownload({
      trackId,
      status: "downloaded",
      progress: 1,
      localUri: cacheMarkerUri
    });
  },
  async removeDownload(trackId) {
    const download = allDownloads().find((item) => item.trackId === trackId);
    if (download?.localUri) {
      const markerInfo = await FileSystem.getInfoAsync(download.localUri);
      if (markerInfo.exists) {
        await FileSystem.deleteAsync(download.localUri, { idempotent: true });
      }
    }

    saveDownloads(allDownloads().filter((item) => item.trackId !== trackId));
  }
};
