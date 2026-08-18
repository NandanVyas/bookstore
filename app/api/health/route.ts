import { NextResponse } from "next/server";
import { pingDatabase } from "@/lib/db";
import { ok } from "@/lib/http";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";

export async function GET() {
  const timestamp = new Date().toISOString();

  try {
    await pingDatabase();
    return ok({ status: "ok", database: "connected", timestamp });
  } catch (error) {
    logger.error("database_health_check_failed", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "DATABASE_UNAVAILABLE",
          message: "The database is temporarily unavailable.",
        },
        data: { status: "degraded", database: "disconnected", timestamp },
      },
      { status: 503 },
    );
  }
}
