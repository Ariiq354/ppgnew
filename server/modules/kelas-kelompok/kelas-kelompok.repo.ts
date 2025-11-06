import { and, count, eq, inArray, like, or, sql, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { kelasTable } from "~~/server/database/schema/generus";
import { desaTable, kelompokTable } from "~~/server/database/schema/wilayah";
import type {
  TKelasList,
  TKelasOptionsList,
  TNamaTanggal,
} from "~~/server/utils/dto";

export async function getAllKelas(
  kelompokId: number,
  { limit, page, search, bulan, tahun, nama }: TKelasList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasTable.kelompokId, kelompokId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(or(like(kelasTable.nama, searchCondition)));
  }

  if (nama) {
    conditions.push(eq(kelasTable.nama, nama));
  }

  if (bulan) {
    conditions.push(
      eq(sql`extract(month from ${kelasTable.tanggal}::date)`, bulan)
    );
  }

  if (tahun) {
    conditions.push(
      eq(sql`extract(year from ${kelasTable.tanggal}::date)`, tahun)
    );
  }

  const query = db
    .select({
      id: kelasTable.id,
      nama: kelasTable.nama,
      tanggal: kelasTable.tanggal,
    })
    .from(kelasTable)
    .where(and(...conditions));

  const total = await tryCatch(
    "Failed to get total count of Kelas",
    db.$count(query)
  );

  const data = await tryCatch(
    "Failed to get list of Kelas",
    query.limit(limit).offset(offset)
  );

  return { data, total };
}

export async function getAllKelasExport(kelompokId: number) {
  return await tryCatch(
    "Failed to export Kelas data",
    db
      .select({
        nama: kelasTable.nama,
        tanggal: kelasTable.tanggal,
      })
      .from(kelasTable)
      .where(eq(kelasTable.kelompokId, kelompokId))
  );
}

export async function getKelasById(id: number) {
  const data = await tryCatch(
    "Failed to get Kelas by ID",
    db.query.kelasTable.findFirst({
      where: eq(kelasTable.id, id),
    })
  );

  return { data };
}

export async function getAllKelasOptions(
  kelompokId: number,
  query: TKelasOptionsList
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasTable.kelompokId, kelompokId),
  ];

  if (query.nama) {
    conditions.push(eq(kelasTable.nama, query.nama));
  }

  const data = await tryCatch(
    "Failed to get all Kelas options",
    db
      .select({
        id: kelasTable.id,
        nama: kelasTable.nama,
        tanggal: kelasTable.tanggal,
      })
      .from(kelasTable)
      .where(and(...conditions))
  );

  return { data };
}

export async function getKelasByKelompokId(kelompokId: number) {
  return await tryCatch(
    "Failed to get Kelas by Kelompok ID",
    db
      .select({
        id: kelasTable.id,
        nama: kelasTable.nama,
      })
      .from(kelasTable)
      .where(eq(kelasTable.kelompokId, kelompokId))
  );
}

export async function getCountKelas(
  params: {
    kelompokId?: number;
    desaId?: number;
    daerahId?: number;
  },
  kelasPengajian: string
) {
  const { daerahId, desaId, kelompokId } = params;

  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasTable.nama, kelasPengajian),
  ];

  if (daerahId) conditions.push(eq(desaTable.daerahId, daerahId));
  if (desaId) conditions.push(eq(kelompokTable.desaId, desaId));
  if (kelompokId) conditions.push(eq(kelasTable.kelompokId, kelompokId));

  const [data] = await tryCatch(
    "Failed to get count of Kelas",
    db
      .select({
        count: count(),
      })
      .from(kelasTable)
      .leftJoin(kelompokTable, eq(kelasTable.kelompokId, kelasTable.id))
      .leftJoin(desaTable, eq(desaTable.id, kelompokTable.desaId))
  );

  return data!.count;
}

export async function createKelas(kelompokId: number, data: TNamaTanggal) {
  return await tryCatch(
    "Failed to create Kelas",
    db.insert(kelasTable).values({
      ...data,
      kelompokId,
    })
  );
}

export async function updateKelas(
  id: number,
  kelompokId: number,
  data: TNamaTanggal
) {
  return await tryCatch(
    "Failed to update Kelas",
    db
      .update(kelasTable)
      .set(data)
      .where(and(eq(kelasTable.id, id), eq(kelasTable.kelompokId, kelompokId)))
  );
}

export async function deleteKelas(kelompokId: number, id: number[]) {
  return await tryCatch(
    "Failed to delete Kelas",
    db
      .delete(kelasTable)
      .where(
        and(inArray(kelasTable.id, id), eq(kelasTable.kelompokId, kelompokId))
      )
  );
}
