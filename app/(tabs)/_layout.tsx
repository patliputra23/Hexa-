import { Tabs } from "expo-router";
import * as Haptics from "expo-haptics";
import { Library, Search, UserRound, Download, Home } from "lucide-react-native";
import { MiniPlayer } from "@/ui/components";
import { colors } from "@/ui/theme";

const tabIcon = (Icon: typeof Home) =>
  function IconRenderer({ color, size }: { color: string; size: number }) {
    return <Icon color={color} size={size} strokeWidth={2.2} />;
  };

export default function TabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.amber,
          tabBarInactiveTintColor: colors.ivoryMuted,
          tabBarStyle: {
            position: "absolute",
            backgroundColor: "rgba(11, 13, 16, 0.96)",
            borderTopColor: colors.border,
            minHeight: 72,
            paddingTop: 8
          },
          sceneStyle: { backgroundColor: colors.graphite }
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{ title: "Home", tabBarIcon: tabIcon(Home) }}
          listeners={{ tabPress: () => Haptics.selectionAsync().catch(() => {}) }}
        />
        <Tabs.Screen
          name="(search)"
          options={{ title: "Search", tabBarIcon: tabIcon(Search) }}
          listeners={{ tabPress: () => Haptics.selectionAsync().catch(() => {}) }}
        />
        <Tabs.Screen
          name="(library)"
          options={{ title: "Library", tabBarIcon: tabIcon(Library) }}
          listeners={{ tabPress: () => Haptics.selectionAsync().catch(() => {}) }}
        />
        <Tabs.Screen
          name="(downloads)"
          options={{ title: "Downloads", tabBarIcon: tabIcon(Download) }}
          listeners={{ tabPress: () => Haptics.selectionAsync().catch(() => {}) }}
        />
        <Tabs.Screen
          name="(profile)"
          options={{ title: "Profile", tabBarIcon: tabIcon(UserRound) }}
          listeners={{ tabPress: () => Haptics.selectionAsync().catch(() => {}) }}
        />
      </Tabs>
      <MiniPlayer />
    </>
  );
}
