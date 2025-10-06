import { and, eq, inArray, like, or, sql, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { kelasGpsTable } from "~~/server/database/schema/desa";
import type { TKelasBaseList, TNamaTanggal } from "~~/server/utils/dto";

export async function getAllKelasGps(
  desaId: number,
  { limit, page, search, bulan, tahun }: TKelasBaseList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasGpsTable.desaId, desaId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(or(like(kelasGpsTable.nama, searchCondition)));
  }

  if (bulan) {
    conditions.push(
      eq(sql`extract(month from ${kelasGpsTable.tanggal}::date)`, bulan)
    );
  }

  if (tahun) {
    conditions.push(
      eq(sql`extract(year from ${kelasGpsTable.tanggal}::date)`, tahun)
    );
  }

  const query = db
    .select({
      id: kelasGpsTable.id,
      nama: kelasGpsTable.nama,
      tanggal: kelasGpsTable.tanggal,
    })
    .from(kelasGpsTable)
    .where(and(...conditions));

  const total = await tryCatch(
    "Failed to get total count of Kelas Gps",
    await to(db.$count(query))
  );

  const data = await tryCatch(
    "Failed to get list of Kelas Gps",
    await to(query.limit(limit).offset(offset))
  );

  return { data, total };
}

export async function getAllKelasGpsExport(desaId: number) {
  return await tryCatch(
    "Failed to export Kelas Gps data",
    await to(
      db
        .select({
          nama: kelasGpsTable.nama,
          tanggal: kelasGpsTable.tanggal,
        })
        .from(kelasGpsTable)
        .where(eq(kelasGpsTable.desaId, desaId))
    )
  );
}

export async function getKelasGpsById(id: number) {
  const data = await tryCatch(
    "Failed to get Kelas Gps By Id",
    await to(
      db.query.kelasGpsTable.findFirst({
        where: eq(kelasGpsTable.id, id),
      })
    )
  );

  return { data };
}

export async function getAllKelasGpsOptions(desaId: number) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasGpsTable.desaId, desaId),
  ];

  const data = await tryCatch(
    "Failed to get all Kelas Gps options",
    await to(
      db
        .select({
          id: kelasGpsTable.id,
          nama: kelasGpsTable.nama,
          tanggal: kelasGpsTable.tanggal,
        })
        .from(kelasGpsTable)
        .where(and(...conditions))
    )
  );

  return { data };
}

export async function getCountKelasGps(
  desaId: number,
  kelasGpsPengajian: string
) {
  return await tryCatch(
    "Failed to get count of Kelas Gps",
    await to(
      db.$count(
        kelasGpsTable,
        and(
          eq(kelasGpsTable.desaId, desaId),
          eq(kelasGpsTable.nama, kelasGpsPengajian)
        )
      )
    )
  );
}

export async function createKelasGps(desaId: number, data: TNamaTanggal) {
  return await tryCatch(
    "Failed to create Kelas Gps",
    await to(
      db.insert(kelasGpsTable).values({
        ...data,
        desaId,
      })
    )
  );
}

export async function updateKelasGps(
  id: number,
  desaId: number,
  data: TNamaTanggal
) {
  return await tryCatch(
    "Failed to update Kelas Gps",
    await to(
      db
        .update(kelasGpsTable)
        .set(data)
        .where(and(eq(kelasGpsTable.id, id), eq(kelasGpsTable.desaId, desaId)))
    )
  );
}

export async function deleteKelasGps(desaId: number, id: number[]) {
  return await tryCatch(
    "Failed to delete Kelas Gps",
    await to(
      db
        .delete(kelasGpsTable)
        .where(
          and(inArray(kelasGpsTable.id, id), eq(kelasGpsTable.desaId, desaId))
        )
    )
  );
}
