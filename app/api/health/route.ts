import { databaseStatus } from "@/lib/db";
import { ok } from "@/lib/http";

export async function GET() {
  return ok({
    status: "ok",
    database: databaseStatus(),
    timestamp: new Date().toISOString(),
  });
}
