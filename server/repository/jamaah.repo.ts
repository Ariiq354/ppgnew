import { and, eq, inArray, like, or, sql, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import {
  absensiJamaahKelompokTable,
  jamaahTable,
} from "~~/server/database/schema/kelompok";
import type { TSearchPagination, TWilayah } from "~~/server/utils/dto";
import type { TJamaahCreate } from "../api/v1/jamaah/_dto";

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
    await to(db.$count(query))
  );

  const data = await tryCatch(
    "Failed to get list of Jamaah",
    await to(query.limit(limit).offset(offset))
  );

  return { data, total };
}

export async function getAllJamaahExport(kelompokId: number) {
  return await tryCatch(
    "Failed to export Jamaah data",
    await to(
      db
        .select({
          nama: jamaahTable.nama,
        })
        .from(jamaahTable)
        .where(eq(jamaahTable.kelompokId, kelompokId))
    )
  );
}

export async function getAllJamaahAbsensi(
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
      hadir: sql<number>`CAST(SUM(CASE WHEN ${absensiJamaahKelompokTable.keterangan} = 'Hadir' THEN 1 ELSE 0 END) AS INT)`,
      izin: sql<number>`CAST(SUM(CASE WHEN ${absensiJamaahKelompokTable.keterangan} = 'Izin' THEN 1 ELSE 0 END) AS INT)`,
    })
    .from(jamaahTable)
    .where(and(...conditions))
    .leftJoin(
      absensiJamaahKelompokTable,
      eq(jamaahTable.id, absensiJamaahKelompokTable.jamaahId)
    )
    .groupBy(jamaahTable.id, jamaahTable.nama);

  const total = await tryCatch(
    "Failed to get total count of Jamaah Absensi",
    await to(db.$count(query))
  );

  const data = await tryCatch(
    "Failed to get list of Jamaah Absensi",
    await to(query.limit(limit).offset(offset))
  );

  return { data, total };
}

export async function getCountJamaah(kelompokId: number) {
  return await tryCatch(
    "Failed to get count of Jamaah",
    await to(db.$count(jamaahTable, eq(jamaahTable.kelompokId, kelompokId)))
  );
}

export async function createJamaah(wilayah: TWilayah, data: TJamaahCreate) {
  return await tryCatch(
    "Failed to create Jamaah",
    await to(
      db.insert(jamaahTable).values({
        ...data,
        ...wilayah,
      })
    )
  );
}

export async function updateJamaah(
  id: number,
  kelompokId: number,
  data: TJamaahCreate
) {
  return await tryCatch(
    "Failed to Update Jamaah",
    await to(
      db
        .update(jamaahTable)
        .set(data)
        .where(
          and(eq(jamaahTable.id, id), eq(jamaahTable.kelompokId, kelompokId))
        )
    )
  );
}

export async function deleteJamaah(kelompokId: number, id: number[]) {
  return await tryCatch(
    "Failed to delete Jamaah",
    await to(
      db
        .delete(jamaahTable)
        .where(
          and(
            inArray(jamaahTable.id, id),
            eq(jamaahTable.kelompokId, kelompokId)
          )
        )
    )
  );
}
