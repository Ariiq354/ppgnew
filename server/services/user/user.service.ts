import { and, eq, like, ne, or, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { user } from "~~/server/database/schema/auth";
import { getTotalQuery } from "~~/server/utils/query";
import type { TUserList } from "./dto/user.dto";

export async function getAllUser(
  daerahId: number,
  { limit, page, search }: TUserList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    ne(user.username, "admin"),
    eq(user.daerahId, daerahId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(
      or(
        like(user.name, searchCondition),
        like(user.email, searchCondition),
        like(user.username, searchCondition),
        like(user.displayUsername, searchCondition),
        like(user.role, searchCondition)
      )
    );
  }

  const query = db
    .select({
      username: user.username,
      role: user.role,
    })
    .from(user)
    .where(and(...conditions))
    .$dynamic();

  try {
    const total = await getTotalQuery(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List User", error);
    throw InternalError;
  }
}
