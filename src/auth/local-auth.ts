import * as Crypto from "expo-crypto";
import * as SecureStore from "expo-secure-store";
import type { AuthProvider } from "@/types/interfaces";
import type { UserProfile } from "@/types/music";
import { storage } from "@/storage/local-storage";

type StoredUser = UserProfile & {
  passwordHash: string;
};

const USERS_KEY = "lumen.auth.users";
const SESSION_KEY = "lumen.auth.session";

async function hashPassword(email: string, password: string) {
  return Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    `${email.trim().toLowerCase()}:${password}:lumen-demo-salt`
  );
}

function toProfile(user: StoredUser): UserProfile {
  const { passwordHash: _passwordHash, ...profile } = user;
  return profile;
}

export const localAuthProvider: AuthProvider = {
  async restoreSession() {
    const userId = await SecureStore.getItemAsync(SESSION_KEY);
    if (!userId) {
      return null;
    }

    const users = storage.get<StoredUser[]>(USERS_KEY, []);
    const user = users.find((item) => item.id === userId);
    return user ? toProfile(user) : null;
  },
  async signIn(email, password) {
    const normalizedEmail = email.trim().toLowerCase();
    let users = storage.get<StoredUser[]>(USERS_KEY, []);
    let user = users.find((item) => item.email === normalizedEmail);
    const passwordHash = await hashPassword(normalizedEmail, password);

    if (!user && normalizedEmail === "demo@lumen.local" && password === "lumenpass") {
      user = {
        id: "user-demo-lumen",
        name: "Lumen Listener",
        email: normalizedEmail,
        avatarToken: "LU",
        plan: "demo-premium",
        createdAt: new Date().toISOString(),
        passwordHash
      };
      users = [user, ...users];
      storage.set(USERS_KEY, users);
    }

    if (!user || user.passwordHash !== passwordHash) {
      throw new Error("The email or password does not match a Lumen demo account.");
    }

    await SecureStore.setItemAsync(SESSION_KEY, user.id);
    return toProfile(user);
  },
  async signUp(name, email, password) {
    const normalizedEmail = email.trim().toLowerCase();
    const users = storage.get<StoredUser[]>(USERS_KEY, []);

    if (!name.trim()) {
      throw new Error("Enter your name to create a Lumen profile.");
    }

    if (password.length < 8) {
      throw new Error("Use at least 8 characters for the demo password.");
    }

    if (users.some((item) => item.email === normalizedEmail)) {
      throw new Error("A Lumen demo account already exists for this email.");
    }

    const user: StoredUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      avatarToken: name.trim().slice(0, 2).toUpperCase(),
      plan: "demo-premium",
      createdAt: new Date().toISOString(),
      passwordHash: await hashPassword(normalizedEmail, password)
    };

    storage.set(USERS_KEY, [...users, user]);
    await SecureStore.setItemAsync(SESSION_KEY, user.id);
    return toProfile(user);
  },
  async signOut() {
    await SecureStore.deleteItemAsync(SESSION_KEY);
  }
};
