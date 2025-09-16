import { and, eq, like, ne, or, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { userTable } from "~~/server/database/schema/auth";
import type { TUserList } from "./dto/user.dto";

export async function getAllUser(
  daerahId: number,
  { limit, page, search }: TUserList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    ne(userTable.username, "admin"),
    eq(userTable.daerahId, daerahId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(
      or(
        like(userTable.name, searchCondition),
        like(userTable.email, searchCondition),
        like(userTable.username, searchCondition),
        like(userTable.displayUsername, searchCondition),
        like(userTable.role, searchCondition)
      )
    );
  }

  const query = db
    .select({
      username: userTable.username,
      role: userTable.role,
    })
    .from(userTable)
    .where(and(...conditions));

  try {
    const total = await db.$count(query);
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
