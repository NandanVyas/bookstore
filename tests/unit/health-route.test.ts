import { beforeEach, describe, expect, it, vi } from "vitest";

const { pingDatabaseMock, loggerErrorMock } = vi.hoisted(() => ({
  pingDatabaseMock: vi.fn(),
  loggerErrorMock: vi.fn(),
}));

vi.mock("@/lib/db", () => ({ pingDatabase: pingDatabaseMock }));
vi.mock("@/lib/logger", () => ({
  logger: { error: loggerErrorMock },
}));

import { GET } from "@/app/api/health/route";

describe("database health route", () => {
  beforeEach(() => {
    pingDatabaseMock.mockReset();
    loggerErrorMock.mockReset();
  });

  it("reports connected only after a successful database ping", async () => {
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(pingDatabaseMock).toHaveBeenCalledOnce();
    expect(body).toMatchObject({
      success: true,
      data: { status: "ok", database: "connected" },
    });
  });

  it("returns a safe 503 response when the database cannot be reached", async () => {
    pingDatabaseMock.mockRejectedValueOnce(new Error("private connection details"));

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(loggerErrorMock).toHaveBeenCalledOnce();
    expect(body).toMatchObject({
      success: false,
      error: { code: "DATABASE_UNAVAILABLE" },
      data: { status: "degraded", database: "disconnected" },
    });
    expect(JSON.stringify(body)).not.toContain("private connection details");
  });
});
