import { count } from "drizzle-orm";
import { db } from "~~/server/database";
import { generusTable } from "~~/server/database/schema/generus";

export async function getCountGenerus() {
  try {
    const [data] = await db
      .select({
        count: count(),
      })
      .from(generusTable);
    return data?.count;
  } catch (error) {
    console.error("Failed to get Count Generus", error);
    throw InternalError;
  }
}
