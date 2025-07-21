import { sql } from "drizzle-orm";
import { db } from "../database";
import type { SQLiteSelect } from "drizzle-orm/sqlite-core";

export async function getTotalQuery<T extends SQLiteSelect>(
  query: T
): Promise<number> {
  const newQuery = query.as("sq");

  const countResult = await db
    .select({
      count: sql<number>`COUNT(*)`,
    })
    .from(newQuery);
  return countResult[0]?.count ?? 0;
}
