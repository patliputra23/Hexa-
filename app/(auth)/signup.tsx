import { useState } from "react";
import { router } from "expo-router";
import { View } from "react-native";
import { useAuthStore } from "@/state/auth-store";
import { ErrorBanner, LumenText, PrimaryButton, Screen, TextField } from "@/ui/components";
import { spacing } from "@/ui/theme";

export default function SignupScreen() {
  const signUp = useAuthStore((state) => state.signUp);
  const error = useAuthStore((state) => state.error);
  const [name, setName] = useState("Lumen Listener");
  const [email, setEmail] = useState("demo@lumen.local");
  const [password, setPassword] = useState("lumenpass");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    try {
      await signUp(name, email, password);
      router.replace("/(tabs)");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <View style={{ gap: spacing.sm }}>
        <LumenText variant="hero">Create your profile</LumenText>
        <LumenText muted>Stored locally for this demo, with a replaceable auth provider behind it.</LumenText>
      </View>
      <ErrorBanner message={error} />
      <TextField label="Name" value={name} onChangeText={setName} textContentType="name" accessibilityLabel="Name" />
      <TextField
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        textContentType="emailAddress"
        accessibilityLabel="Email address"
      />
      <TextField
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textContentType="newPassword"
        accessibilityLabel="Password"
      />
      <PrimaryButton disabled={loading} onPress={handleSubmit} accessibilityLabel="Create local Lumen account">
        {loading ? "Creating..." : "Create account"}
      </PrimaryButton>
    </Screen>
  );
}
