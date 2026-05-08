import type { AudioAssetKey } from "@/types/music";

export const audioAssets: Record<AudioAssetKey, number> = {
  auroraCircuit: require("../../assets/audio/aurora-circuit.wav"),
  glassHarbor: require("../../assets/audio/glass-harbor.wav"),
  lowSunRelay: require("../../assets/audio/low-sun-relay.wav"),
  paperMoons: require("../../assets/audio/paper-moons.wav"),
  violetSignal: require("../../assets/audio/violet-signal.wav")
};
