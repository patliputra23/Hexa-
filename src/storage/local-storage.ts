import "expo-sqlite/localStorage/install";

type Listener = () => void;

const listeners = new Map<string, Set<Listener>>();

export const storage = {
  get<T>(key: string, defaultValue: T): T {
    const value = localStorage.getItem(key);
    if (!value) {
      return defaultValue;
    }

    try {
      return JSON.parse(value) as T;
    } catch {
      return defaultValue;
    }
  },
  set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
    listeners.get(key)?.forEach((listener) => listener());
  },
  remove(key: string) {
    localStorage.removeItem(key);
    listeners.get(key)?.forEach((listener) => listener());
  },
  subscribe(key: string, listener: Listener) {
    if (!listeners.has(key)) {
      listeners.set(key, new Set());
    }

    listeners.get(key)?.add(listener);
    return () => listeners.get(key)?.delete(listener);
  }
};
