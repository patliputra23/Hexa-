import { create } from "zustand";
import { storage } from "@/storage/local-storage";
import type { AppSettings } from "@/types/music";

const SETTINGS_KEY = "lumen.settings";

export const defaultSettings: AppSettings = {
  streamingQuality: "balanced",
  downloadOnWifiOnly: true,
  crossfadeSeconds: 3,
  reduceMotion: false,
  analyticsEnabled: false,
  crashLoggingEnabled: true
};

type SettingsStore = {
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
};

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  settings: storage.get(SETTINGS_KEY, defaultSettings),
  updateSettings(settings) {
    const next = { ...get().settings, ...settings };
    storage.set(SETTINGS_KEY, next);
    set({ settings: next });
  }
}));
