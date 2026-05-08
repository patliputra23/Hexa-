import type { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "Lumen",
  slug: "lumen-music",
  scheme: "lumen",
  version: "1.0.0",
  orientation: "portrait",
  userInterfaceStyle: "dark",
  icon: "./assets/images/icon.png",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#0B0D10"
  },
  assetBundlePatterns: ["assets/audio/*", "assets/images/*"],
  ios: {
    supportsTablet: false,
    bundleIdentifier: "com.lumen.audio"
  },
  android: {
    package: "com.lumen.audio",
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#0B0D10"
    },
    permissions: [
      "INTERNET",
      "ACCESS_NETWORK_STATE",
      "FOREGROUND_SERVICE",
      "FOREGROUND_SERVICE_MEDIA_PLAYBACK",
      "POST_NOTIFICATIONS"
    ]
  },
  plugins: [
    "expo-router",
    "expo-secure-store",
    [
      "expo-audio",
      {
        microphonePermission: "Lumen does not record audio in this demo build.",
        enableBackgroundPlayback: true,
        enableBackgroundRecording: false
      }
    ]
  ],
  extra: {
    apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? "mock://lumen",
    analyticsEnabled: process.env.EXPO_PUBLIC_ANALYTICS_ENABLED === "true",
    ...(process.env.EXPO_PUBLIC_EAS_PROJECT_ID
      ? {
          eas: {
            projectId: process.env.EXPO_PUBLIC_EAS_PROJECT_ID
          }
        }
      : {})
  }
};

export default config;
