import { Link, router } from "expo-router";
import { View } from "react-native";
import { ListMusic, LogOut, Settings, UserRound } from "lucide-react-native";
import { useAuthStore } from "@/state/auth-store";
import { useLibraryStore } from "@/state/library-store";
import { Artwork, IconButton, LumenText, PrimaryButton, Screen } from "@/ui/components";
import { colors, spacing } from "@/ui/theme";

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);
  const favorites = useLibraryStore((state) => state.favorites.trackIds.length);
  const playlists = useLibraryStore((state) => state.playlists.length);
  const downloads = useLibraryStore((state) => Object.values(state.downloads).filter((item) => item.status === "downloaded").length);

  async function handleSignOut() {
    await signOut();
    router.replace("/onboarding");
  }

  return (
    <Screen>
      <View
        style={{
          alignItems: "center",
          gap: spacing.md,
          padding: spacing.xl,
          borderRadius: 30,
          borderCurve: "continuous",
          backgroundColor: colors.graphiteRaised,
          borderWidth: 1,
          borderColor: colors.border
        }}
      >
        <Artwork token={user?.avatarToken ?? "LU"} color={colors.amber} size={110} />
        <View style={{ alignItems: "center", gap: spacing.xs }}>
          <LumenText variant="title">{user?.name ?? "Lumen Listener"}</LumenText>
          <LumenText muted>{user?.email ?? "local demo profile"}</LumenText>
          <LumenText variant="caption" style={{ color: colors.teal }}>
            {user?.plan ?? "demo-premium"}
          </LumenText>
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: spacing.md }}>
        <Stat label="Favorites" value={favorites} />
        <Stat label="Mixes" value={playlists} />
        <Stat label="Offline" value={downloads} />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center", gap: spacing.md }}>
        <Link href="/playlists" asChild>
          <IconButton icon={ListMusic} label="Open playlists" />
        </Link>
        <Link href="/settings" asChild>
          <IconButton icon={Settings} label="Open settings" />
        </Link>
        <IconButton icon={UserRound} label="Profile details" active />
      </View>

      <PrimaryButton tone="quiet" onPress={handleSignOut} accessibilityLabel="Log out of Lumen">
        <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm }}>
          <LogOut color={colors.ivory} size={18} />
          <LumenText>Log out</LumenText>
        </View>
      </PrimaryButton>
    </Screen>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        padding: spacing.md,
        borderRadius: 20,
        backgroundColor: colors.graphiteRaised,
        borderWidth: 1,
        borderColor: colors.border
      }}
    >
      <LumenText variant="title" style={{ fontVariant: ["tabular-nums"] }}>
        {value}
      </LumenText>
      <LumenText variant="caption" muted>
        {label}
      </LumenText>
    </View>
  );
}
