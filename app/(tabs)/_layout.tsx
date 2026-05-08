import { Tabs } from "expo-router";
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
        <Tabs.Screen name="(home)/index" options={{ title: "Home", tabBarIcon: tabIcon(Home) }} />
        <Tabs.Screen name="(search)/index" options={{ title: "Search", tabBarIcon: tabIcon(Search) }} />
        <Tabs.Screen name="(library)/index" options={{ title: "Library", tabBarIcon: tabIcon(Library) }} />
        <Tabs.Screen name="(downloads)/index" options={{ title: "Downloads", tabBarIcon: tabIcon(Download) }} />
        <Tabs.Screen name="(profile)/index" options={{ title: "Profile", tabBarIcon: tabIcon(UserRound) }} />
      </Tabs>
      <MiniPlayer />
    </>
  );
}
