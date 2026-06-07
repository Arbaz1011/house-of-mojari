import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

/** Vercel serverless only allows writes under /tmp */
const DATA_DIR =
  process.env.VERCEL === "1"
    ? path.join("/tmp", "house-of-mojari-data")
    : path.join(process.cwd(), "data");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readCollection<T>(name: string): Promise<T[]> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, `${name}.json`);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

async function writeCollection<T>(name: string, data: T[]): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, `${name}.json`);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export function newId(): string {
  return randomUUID();
}

export function timestamps() {
  const now = new Date().toISOString();
  return { createdAt: now, updatedAt: now };
}

export async function connectDB() {
  await ensureDataDir();
}

export { readCollection, writeCollection, DATA_DIR };
