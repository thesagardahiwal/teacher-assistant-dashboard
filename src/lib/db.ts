// src/lib/db.ts
import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const options = {};

let client: MongoClient;
let db: Db;

let cached = (global as any)._mongo || { conn: null, promise: null };

if (!process.env.MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

export async function connectToDB(): Promise<Db> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = MongoClient.connect(uri, options).then((clientInstance) => {
      db = clientInstance.db(); // Default DB from URI
      return db;
    });
  }

  cached.conn = await cached.promise;
  (global as any)._mongo = cached;

  return cached.conn;
}
