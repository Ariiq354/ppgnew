import { and, eq, inArray, like, or, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { musyawarahMuslimunTable } from "~~/server/database/schema/kelompok";
import type { TSearchPagination } from "~~/server/utils/dto/common.dto";

export async function getAllMuslimun(
  kelompokId: number,
  { limit, page, search }: TSearchPagination
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(musyawarahMuslimunTable.kelompokId, kelompokId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(or(like(musyawarahMuslimunTable.nama, searchCondition)));
  }

  const query = db
    .select({
      id: musyawarahMuslimunTable.id,
      nama: musyawarahMuslimunTable.nama,
      tanggal: musyawarahMuslimunTable.tanggal,
    })
    .from(musyawarahMuslimunTable)
    .where(and(...conditions));

  const total = await tryCatch(
    "Failed to get total count of Muslimun",
    db.$count(query)
  );

  const data = await tryCatch(
    "Failed to get list of Muslimun",
    query.limit(limit).offset(offset)
  );

  return { data, total };
}

export async function getAllMuslimunExport(kelompokId: number) {
  return await tryCatch(
    "Failed to export Musyawarah data",
    db
      .select({
        nama: musyawarahMuslimunTable.nama,
        tanggal: musyawarahMuslimunTable.tanggal,
      })
      .from(musyawarahMuslimunTable)
      .where(eq(musyawarahMuslimunTable.kelompokId, kelompokId))
  );
}

export async function getAllMuslimunOptions(kelompokId: number) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(musyawarahMuslimunTable.kelompokId, kelompokId),
  ];

  const data = await tryCatch(
    "Failed to get all Muslimun options",
    db
      .select({
        id: musyawarahMuslimunTable.id,
        nama: musyawarahMuslimunTable.nama,
        tanggal: musyawarahMuslimunTable.tanggal,
      })
      .from(musyawarahMuslimunTable)
      .where(and(...conditions))
  );

  return { data };
}

export async function createMuslimun(kelompokId: number, data: TNamaTanggal) {
  return await tryCatch(
    "Failed to create Muslimun",
    db.insert(musyawarahMuslimunTable).values({
      ...data,
      kelompokId,
    })
  );
}

export async function updateMuslimun(
  id: number,
  kelompokId: number,
  data: TNamaTanggal
) {
  return await tryCatch(
    "Failed to update Muslimun",
    db
      .update(musyawarahMuslimunTable)
      .set(data)
      .where(
        and(
          eq(musyawarahMuslimunTable.id, id),
          eq(musyawarahMuslimunTable.kelompokId, kelompokId)
        )
      )
  );
}

export async function deleteMuslimun(kelompokId: number, id: number[]) {
  return await tryCatch(
    "Failed to delete Muslimun",
    db
      .delete(musyawarahMuslimunTable)
      .where(
        and(
          inArray(musyawarahMuslimunTable.id, id),
          eq(musyawarahMuslimunTable.kelompokId, kelompokId)
        )
      )
  );
}
