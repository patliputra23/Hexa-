import { create } from "zustand";
import { localAuthProvider } from "@/auth/local-auth";
import { trackEvent } from "@/analytics/analytics";
import { logger } from "@/logging/logger";
import type { UserProfile } from "@/types/music";

type AuthStatus = "checking" | "signed-out" | "signed-in";

type AuthStore = {
  status: AuthStatus;
  user: UserProfile | null;
  error: string | null;
  restore: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
};

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message ? error.message : fallback;
}

function isValidUserProfile(user: UserProfile | null | undefined): user is UserProfile {
  return Boolean(user && user.id && user.email);
}

export const useAuthStore = create<AuthStore>((set) => ({
  status: "checking",
  user: null,
  error: null,
  async restore() {
    try {
      const restoredUser = await localAuthProvider.restoreSession();
      const user = isValidUserProfile(restoredUser) ? restoredUser : null;
      set({ user, status: user ? "signed-in" : "signed-out", error: null });
      trackEvent("auth_restore", { signedIn: Boolean(user) });
    } catch (error) {
      logger.error("Failed to restore auth session", error);
      set({ user: null, status: "signed-out", error: "Could not restore your Lumen session." });
    }
  },
  async signIn(email, password) {
    set({ error: null });
    try {
      const user = await localAuthProvider.signIn(email, password);
      if (!isValidUserProfile(user)) {
        throw new Error("We could not load your account details. Please try again.");
      }
      set({ user, status: "signed-in" });
      trackEvent("auth_sign_in", { method: "local" });
    } catch (error) {
      const message = getErrorMessage(error, "Sign in failed.");
      logger.warn("Local sign in failed", { email });
      set({ error: message, status: "signed-out" });
    }
  },
  async signUp(name, email, password) {
    set({ error: null });
    try {
      const user = await localAuthProvider.signUp(name, email, password);
      if (!isValidUserProfile(user)) {
        throw new Error("We could not finish creating your account. Please try again.");
      }
      set({ user, status: "signed-in" });
      trackEvent("auth_sign_up", { method: "local" });
    } catch (error) {
      const message = getErrorMessage(error, "Sign up failed.");
      logger.warn("Local sign up failed", { email });
      set({ error: message, status: "signed-out" });
    }
  },
  async signOut() {
    try {
      await localAuthProvider.signOut();
    } finally {
      set({ user: null, status: "signed-out", error: null });
      trackEvent("auth_sign_out");
    }
  },
  clearError() {
    set({ error: null });
  }
}));
