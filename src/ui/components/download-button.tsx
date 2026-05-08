import { AlertCircle, Download, LoaderCircle, Trash2 } from "lucide-react-native";
import { useLibraryStore } from "@/state/library-store";
import { IconButton } from "./buttons";

export function DownloadButton({ trackId, isDownloadable }: { trackId: string; isDownloadable: boolean }) {
  const download = useLibraryStore((state) => state.downloads[trackId]);
  const downloadTrack = useLibraryStore((state) => state.downloadTrack);
  const removeDownload = useLibraryStore((state) => state.removeDownload);
  const status = download?.status ?? "idle";

  if (!isDownloadable) {
    return <IconButton icon={AlertCircle} label="Streaming only" active={false} disabled />;
  }

  if (status === "downloaded") {
    return (
      <IconButton
        icon={Trash2}
        label="Remove download"
        active
        onPress={(event) => {
          event.stopPropagation();
          removeDownload(trackId);
        }}
      />
    );
  }

  if (status === "downloading" || status === "queued") {
    return <IconButton icon={LoaderCircle} label="Downloading track" active disabled />;
  }

  if (status === "failed") {
    return (
      <IconButton
        icon={AlertCircle}
        label={download?.error ?? "Download failed"}
        onPress={(event) => {
          event.stopPropagation();
          downloadTrack(trackId);
        }}
      />
    );
  }

  return (
    <IconButton
      icon={Download}
      label="Download licensed demo track"
      onPress={(event) => {
        event.stopPropagation();
        downloadTrack(trackId);
      }}
    />
  );
}
