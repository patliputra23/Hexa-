import { View } from "react-native";
import { BarChart3, Bug, Download, Gauge, Shield, SlidersHorizontal, Wifi } from "lucide-react-native";
import { useSettingsStore } from "@/state/settings-store";
import { LumenText, Screen, SegmentedTabs, SettingsRow } from "@/ui/components";
import { spacing } from "@/ui/theme";

export default function SettingsScreen() {
  const settings = useSettingsStore((state) => state.settings);
  const updateSettings = useSettingsStore((state) => state.updateSettings);

  return (
    <Screen>
      <View style={{ gap: spacing.xs }}>
        <LumenText variant="hero">Settings</LumenText>
        <LumenText muted>Privacy-first demo defaults, offline controls, and release-ready toggles.</LumenText>
      </View>

      <View style={{ gap: spacing.sm }}>
        <LumenText variant="title">Streaming quality</LumenText>
        <SegmentedTabs
          value={settings.streamingQuality}
          onChange={(streamingQuality) => updateSettings({ streamingQuality })}
          options={[
            { value: "balanced", label: "Balanced" },
            { value: "high", label: "High" }
          ]}
        />
      </View>

      <SettingsRow
        icon={Wifi}
        title="Wi-Fi downloads"
        body="Download licensed demo tracks only on trusted networks."
        value={settings.downloadOnWifiOnly}
        onValueChange={(downloadOnWifiOnly) => updateSettings({ downloadOnWifiOnly })}
      />
      <SettingsRow
        icon={SlidersHorizontal}
        title="Reduce motion"
        body="Keep animations calmer for motion-sensitive listeners."
        value={settings.reduceMotion}
        onValueChange={(reduceMotion) => updateSettings({ reduceMotion })}
      />
      <SettingsRow
        icon={BarChart3}
        title="Analytics hooks"
        body="Store local analytics events for integration testing."
        value={settings.analyticsEnabled}
        onValueChange={(analyticsEnabled) => updateSettings({ analyticsEnabled })}
      />
      <SettingsRow
        icon={Bug}
        title="Crash-safe logging"
        body="Keep recent app logs locally for debugging."
        value={settings.crashLoggingEnabled}
        onValueChange={(crashLoggingEnabled) => updateSettings({ crashLoggingEnabled })}
      />
      <SettingsRow icon={Gauge} title="Crossfade" body={`${settings.crossfadeSeconds}s configured for the future playback engine.`} />
      <SettingsRow icon={Download} title="Offline license" body="Only tracks marked downloadable can be cached." />
      <SettingsRow icon={Shield} title="Privacy policy" body="See docs/privacy-policy.md before store submission." />
    </Screen>
  );
}
