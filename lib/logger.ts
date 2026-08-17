type LogContext = Record<string, string | number | boolean | null | undefined>;

function write(level: "info" | "warn" | "error", event: string, context: LogContext = {}) {
  const payload = JSON.stringify({
    level,
    event,
    timestamp: new Date().toISOString(),
    ...context,
  });

  if (level === "error") console.error(payload);
  else if (level === "warn") console.warn(payload);
  else console.info(payload);
}

export const logger = {
  info: (event: string, context?: LogContext) => write("info", event, context),
  warn: (event: string, context?: LogContext) => write("warn", event, context),
  error: (event: string, error?: unknown, context?: LogContext) =>
    write("error", event, {
      ...context,
      errorName: error instanceof Error ? error.name : "UnknownError",
      ...(process.env.NODE_ENV === "development" && error instanceof Error
        ? { errorMessage: error.message }
        : {}),
    }),
};
