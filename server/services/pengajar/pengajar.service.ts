import { count } from "drizzle-orm";
import { db } from "~~/server/database";
import { pengajarTable } from "~~/server/database/schema/pengajar";

export async function getCountPengajar() {
  try {
    const [data] = await db
      .select({
        count: count(),
      })
      .from(pengajarTable);
    return data?.count;
  } catch (error) {
    console.error("Failed to get Count Pengajar", error);
    throw InternalError;
  }
}
