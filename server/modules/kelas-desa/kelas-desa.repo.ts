import { and, eq, inArray, like, or, sql, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { kelasDesaTable } from "~~/server/database/schema/desa";
import type {
  TKelasList,
  TKelasOptionsList,
  TNamaTanggal,
} from "~~/server/utils/dto";

export async function getAllKelasDesa(
  desaId: number,
  { limit, page, search, bulan, tahun, nama }: TKelasList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasDesaTable.desaId, desaId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(or(like(kelasDesaTable.nama, searchCondition)));
  }

  if (nama) {
    conditions.push(eq(kelasDesaTable.nama, nama));
  }

  if (bulan) {
    conditions.push(
      eq(sql`extract(month from ${kelasDesaTable.tanggal}::date)`, bulan)
    );
  }

  if (tahun) {
    conditions.push(
      eq(sql`extract(year from ${kelasDesaTable.tanggal}::date)`, tahun)
    );
  }

  const query = db
    .select({
      id: kelasDesaTable.id,
      nama: kelasDesaTable.nama,
      tanggal: kelasDesaTable.tanggal,
    })
    .from(kelasDesaTable)
    .where(and(...conditions));

  const total = await tryCatch(
    "Failed to get total count of Kelas Desa",
    db.$count(query)
  );

  const data = await tryCatch(
    "Failed to get list of Kelas Desa",
    query.limit(limit).offset(offset)
  );

  return { data, total };
}

export async function getAllKelasDesaExport(desaId: number) {
  return await tryCatch(
    "Failed to export Kelas Desa data",
    db
      .select({
        nama: kelasDesaTable.nama,
        tanggal: kelasDesaTable.tanggal,
      })
      .from(kelasDesaTable)
      .where(eq(kelasDesaTable.desaId, desaId))
  );
}

export async function getKelasDesaById(id: number) {
  const data = await tryCatch(
    "Failed to get Kelas Desa By Id",
    db.query.kelasDesaTable.findFirst({
      where: eq(kelasDesaTable.id, id),
    })
  );

  return { data };
}

export async function getKelasByDesaId(desaId: number) {
  return await tryCatch(
    "Failed to get Kelas Desa By Desa Id",
    db
      .select({
        id: kelasDesaTable.id,
        nama: kelasDesaTable.nama,
      })
      .from(kelasDesaTable)
      .where(eq(kelasDesaTable.desaId, desaId))
  );
}

export async function getAllKelasDesaOptions(
  desaId: number,
  query: TKelasOptionsList
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasDesaTable.desaId, desaId),
  ];

  if (query.nama) {
    conditions.push(eq(kelasDesaTable.nama, query.nama));
  }

  const data = await tryCatch(
    "Failed to get all Kelas Desa options",
    db
      .select({
        id: kelasDesaTable.id,
        nama: kelasDesaTable.nama,
        tanggal: kelasDesaTable.tanggal,
      })
      .from(kelasDesaTable)
      .where(and(...conditions))
  );

  return { data };
}

export async function getCountKelasDesa(
  desaId: number,
  kelasDesaPengajian: string
) {
  return await tryCatch(
    "Failed to get count of Kelas Desa",
    db.$count(
      kelasDesaTable,
      and(
        eq(kelasDesaTable.desaId, desaId),
        eq(kelasDesaTable.nama, kelasDesaPengajian)
      )
    )
  );
}

export async function createKelasDesa(desaId: number, data: TNamaTanggal) {
  return await tryCatch(
    "Failed to create Kelas Desa",
    db.insert(kelasDesaTable).values({
      ...data,
      desaId,
    })
  );
}

export async function updateKelasDesa(
  id: number,
  desaId: number,
  data: TNamaTanggal
) {
  return await tryCatch(
    "Failed to update Kelas Desa",
    db
      .update(kelasDesaTable)
      .set(data)
      .where(and(eq(kelasDesaTable.id, id), eq(kelasDesaTable.desaId, desaId)))
  );
}

export async function deleteKelasDesa(desaId: number, id: number[]) {
  return await tryCatch(
    "Failed to delete Kelas Desa",
    db
      .delete(kelasDesaTable)
      .where(
        and(inArray(kelasDesaTable.id, id), eq(kelasDesaTable.desaId, desaId))
      )
  );
}
