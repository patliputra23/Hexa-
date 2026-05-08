import type { Logger } from "@/types/interfaces";
import { storage } from "@/storage/local-storage";

type LogEntry = {
  level: "info" | "warn" | "error";
  message: string;
  context?: Record<string, unknown>;
  timestamp: string;
};

const LOG_KEY = "lumen.logs";

function write(level: LogEntry["level"], message: string, context?: Record<string, unknown>) {
  const logs = storage.get<LogEntry[]>(LOG_KEY, []);
  storage.set(LOG_KEY, [
    ...logs.slice(-80),
    {
      level,
      message,
      context,
      timestamp: new Date().toISOString()
    }
  ]);
}

export const logger: Logger = {
  info(message, context) {
    write("info", message, context);
    console.info(`[Lumen] ${message}`, context ?? "");
  },
  warn(message, context) {
    write("warn", message, context);
    console.warn(`[Lumen] ${message}`, context ?? "");
  },
  error(message, error, context) {
    write("error", message, { ...context, error: String(error) });
    console.error(`[Lumen] ${message}`, error, context ?? "");
  }
};
