import type { PgSelect } from "drizzle-orm/pg-core";
import { db } from "../database";

export async function getTotalQuery<T extends PgSelect>(
  query: T
): Promise<number> {
  return await db.$count(query);

  // const countResult = await db
  //   .select({
  //     count: sql<number>`COUNT(*)`,
  //   })
  //   .from(sql`(${query}) as sq`);
  // return countResult[0]?.count ?? 0;
}
