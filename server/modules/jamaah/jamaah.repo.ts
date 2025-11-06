import { and, eq, inArray, like, or, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { jamaahTable } from "~~/server/database/schema/kelompok";
import type { TSearchPagination, TWilayah } from "~~/server/utils/dto";
import type { TJamaahCreate } from "./jamaah.dto";

export async function getAllJamaah(
  kelompokId: number,
  { limit, page, search }: TSearchPagination
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(jamaahTable.kelompokId, kelompokId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(or(like(jamaahTable.nama, searchCondition)));
  }

  const query = db
    .select({
      id: jamaahTable.id,
      nama: jamaahTable.nama,
    })
    .from(jamaahTable)
    .where(and(...conditions));

  const total = await tryCatch(
    "Failed to get total count of Jamaah",
    db.$count(query)
  );

  const data = await tryCatch(
    "Failed to get list of Jamaah",
    query.limit(limit).offset(offset)
  );

  return { data, total };
}

export async function getAllJamaahExport(kelompokId: number) {
  return await tryCatch(
    "Failed to export Jamaah data",
    db
      .select({
        nama: jamaahTable.nama,
      })
      .from(jamaahTable)
      .where(eq(jamaahTable.kelompokId, kelompokId))
  );
}

export async function getCountJamaah(kelompokId: number) {
  return await tryCatch(
    "Failed to get count of Jamaah",
    db.$count(jamaahTable, eq(jamaahTable.kelompokId, kelompokId))
  );
}

export async function createJamaah(wilayah: TWilayah, data: TJamaahCreate) {
  return await tryCatch(
    "Failed to create Jamaah",
    db.insert(jamaahTable).values({
      ...data,
      ...wilayah,
    })
  );
}

export async function updateJamaah(
  id: number,
  kelompokId: number,
  data: TJamaahCreate
) {
  return await tryCatch(
    "Failed to Update Jamaah",
    db
      .update(jamaahTable)
      .set(data)
      .where(
        and(eq(jamaahTable.id, id), eq(jamaahTable.kelompokId, kelompokId))
      )
  );
}

export async function deleteJamaah(kelompokId: number, id: number[]) {
  return await tryCatch(
    "Failed to delete Jamaah",
    db
      .delete(jamaahTable)
      .where(
        and(inArray(jamaahTable.id, id), eq(jamaahTable.kelompokId, kelompokId))
      )
  );
}
