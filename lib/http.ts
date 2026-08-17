import { NextResponse } from "next/server";
import { ZodError } from "zod";
import type { ApiFailure, ApiSuccess } from "@/types";
import { logger } from "@/lib/logger";

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function ok<T>(data: T, status = 200) {
  return NextResponse.json<ApiSuccess<T>>({ success: true, data }, { status });
}

export function handleApiError(error: unknown, requestId?: string) {
  if (error instanceof ApiError) {
    return NextResponse.json<ApiFailure>(
      { success: false, error: { code: error.code, message: error.message } },
      { status: error.status },
    );
  }

  if (error instanceof ZodError) {
    return NextResponse.json<ApiFailure>(
      {
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Please correct the highlighted fields.",
          fields: error.flatten().fieldErrors as Record<string, string[]>,
        },
      },
      { status: 400 },
    );
  }

  logger.error("api_request_failed", error, { requestId });
  return NextResponse.json<ApiFailure>(
    {
      success: false,
      error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." },
    },
    { status: 500 },
  );
}

export async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    throw new ApiError(400, "INVALID_JSON", "The request body must be valid JSON.");
  }
}

export function assertSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && new URL(request.url).origin !== origin) {
    throw new ApiError(403, "INVALID_ORIGIN", "The request origin is not allowed.");
  }
}
