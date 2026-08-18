import "server-only";
import mongoose from "mongoose";
import { getDatabaseUri } from "@/lib/env";

type MongooseCache = {
  connection: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cache = global.mongooseCache ?? { connection: null, promise: null };
global.mongooseCache = cache;

export async function connectDB(): Promise<typeof mongoose> {
  if (cache.connection) return cache.connection;

  if (!cache.promise) {
    cache.promise = mongoose.connect(getDatabaseUri(), {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5_000,
    });
  }

  try {
    cache.connection = await cache.promise;
    return cache.connection;
  } catch (error) {
    cache.promise = null;
    throw error;
  }
}

export async function pingDatabase(): Promise<void> {
  const connection = await connectDB();
  const database = connection.connection.db;
  if (!database || connection.connection.readyState !== 1) {
    throw new Error("MongoDB connection is not ready.");
  }

  await database.command({ ping: 1 }, { timeoutMS: 5_000 });
}
