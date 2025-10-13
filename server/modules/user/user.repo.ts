import { and, eq, like, ne, or, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { userTable } from "~~/server/database/schema/auth";
import type { TSearchPagination, TWilayah } from "~~/server/utils/dto";

export async function getAllUser(
  daerahId: number,
  { limit, page, search }: TSearchPagination
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

  const total = await tryCatch("Failed to get total user", db.$count(query));
  const data = await tryCatch(
    "Failed to get list user",
    query.limit(limit).offset(offset)
  );

  return { data, total };
}

export async function updateUserWilayah(id: number, body: TWilayah) {
  await tryCatch(
    "Failed to update user wilayah",
    db.update(userTable).set(body).where(eq(userTable.id, id))
  );
}
