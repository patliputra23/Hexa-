import { useState } from "react";
import { router } from "expo-router";
import { View } from "react-native";
import { useAuthStore } from "@/state/auth-store";
import { ErrorBanner, LumenText, PrimaryButton, Screen, TextField } from "@/ui/components";
import { spacing } from "@/ui/theme";

export default function LoginScreen() {
  const signIn = useAuthStore((state) => state.signIn);
  const error = useAuthStore((state) => state.error);
  const [email, setEmail] = useState("demo@lumen.local");
  const [password, setPassword] = useState("lumenpass");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    try {
      await signIn(email, password);
      router.replace("/(tabs)");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <View style={{ gap: spacing.sm }}>
        <LumenText variant="hero">Welcome back</LumenText>
        <LumenText muted>Use your local Lumen demo account to continue listening.</LumenText>
      </View>
      <ErrorBanner message={error} />
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
        textContentType="password"
        accessibilityLabel="Password"
      />
      <PrimaryButton disabled={loading} onPress={handleSubmit} accessibilityLabel="Log in">
        {loading ? "Signing in..." : "Log in"}
      </PrimaryButton>
    </Screen>
  );
}
