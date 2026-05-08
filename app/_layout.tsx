import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AudioProvider } from "@/player/audio-provider";
import { useAuthStore } from "@/state/auth-store";
import { useLibraryStore } from "@/state/library-store";
import { colors } from "@/ui/theme";

function AppBootstrap() {
  const restore = useAuthStore((state) => state.restore);
  const hydrateDownloads = useLibraryStore((state) => state.hydrateDownloads);

  useEffect(() => {
    restore();
    hydrateDownloads();
  }, [hydrateDownloads, restore]);

  return null;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.graphite }}>
      <SafeAreaProvider>
        <AudioProvider>
          <AppBootstrap />
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: colors.graphite },
              headerTintColor: colors.ivory,
              headerShadowVisible: false,
              contentStyle: { backgroundColor: colors.graphite }
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="album/[id]" options={{ title: "Album" }} />
            <Stack.Screen name="artist/[id]" options={{ title: "Artist" }} />
            <Stack.Screen name="player" options={{ title: "Now Playing", presentation: "modal" }} />
            <Stack.Screen name="queue" options={{ title: "Queue" }} />
            <Stack.Screen name="playlists" options={{ title: "Playlists" }} />
            <Stack.Screen name="playlists/[id]" options={{ title: "Playlist" }} />
            <Stack.Screen name="settings" options={{ title: "Settings" }} />
          </Stack>
        </AudioProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
