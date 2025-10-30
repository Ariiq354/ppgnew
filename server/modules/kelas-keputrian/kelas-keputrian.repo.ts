import { and, eq, inArray, like, or, sql, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { kelasKeputrianTable } from "~~/server/database/schema/keputrian";
import type {
  TKelasList,
  TKelasOptionsList,
  TNamaTanggal,
} from "~~/server/utils/dto";

export async function getAllKelasKeputrian(
  daerahId: number,
  { limit, page, search, bulan, tahun, nama }: TKelasList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasKeputrianTable.daerahId, daerahId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(or(like(kelasKeputrianTable.nama, searchCondition)));
  }

  if (nama) {
    conditions.push(eq(kelasKeputrianTable.nama, nama));
  }

  if (bulan) {
    conditions.push(
      eq(sql`extract(month from ${kelasKeputrianTable.tanggal}::date)`, bulan)
    );
  }

  if (tahun) {
    conditions.push(
      eq(sql`extract(year from ${kelasKeputrianTable.tanggal}::date)`, tahun)
    );
  }

  const query = db
    .select({
      id: kelasKeputrianTable.id,
      nama: kelasKeputrianTable.nama,
      tanggal: kelasKeputrianTable.tanggal,
    })
    .from(kelasKeputrianTable)
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

export async function getAllKelasKeputrianExport(daerahId: number) {
  return await tryCatch(
    "Failed to export Kelas Keputrian data",
    db
      .select({
        nama: kelasKeputrianTable.nama,
        tanggal: kelasKeputrianTable.tanggal,
      })
      .from(kelasKeputrianTable)
      .where(eq(kelasKeputrianTable.daerahId, daerahId))
  );
}

export async function getKelasKeputrianById(id: number) {
  const data = await tryCatch(
    "Failed to get Kelas Keputrian By Id",
    db.query.kelasKeputrianTable.findFirst({
      where: eq(kelasKeputrianTable.id, id),
    })
  );

  return { data };
}

export async function getAllKelasKeputrianOptions(
  daerahId: number,
  query: TKelasOptionsList
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasKeputrianTable.daerahId, daerahId),
  ];

  if (query.nama) {
    conditions.push(eq(kelasKeputrianTable.nama, query.nama));
  }

  const data = await tryCatch(
    "Failed to get all Kelas Keputrian options",
    db
      .select({
        id: kelasKeputrianTable.id,
        nama: kelasKeputrianTable.nama,
        tanggal: kelasKeputrianTable.tanggal,
      })
      .from(kelasKeputrianTable)
      .where(and(...conditions))
  );

  return { data };
}

export async function getKelasKeputrianByDaerahId(daerahId: number) {
  return await tryCatch(
    "Failed to get all Kelas Keputrian options",
    db
      .select({
        id: kelasKeputrianTable.id,
        nama: kelasKeputrianTable.nama,
        tanggal: kelasKeputrianTable.tanggal,
      })
      .from(kelasKeputrianTable)
      .where(eq(kelasKeputrianTable.daerahId, daerahId))
  );
}

export async function getCountKelasKeputrian(
  daerahId: number,
  kelasPengajian: string
) {
  return await tryCatch(
    "Failed to get count of Kelas Keputrian",
    db.$count(
      kelasKeputrianTable,
      and(
        eq(kelasKeputrianTable.daerahId, daerahId),
        eq(kelasKeputrianTable.nama, kelasPengajian)
      )
    )
  );
}

export async function createKelasKeputrian(
  daerahId: number,
  data: TNamaTanggal
) {
  return await tryCatch(
    "Failed to create Kelas Keputrian",
    db.insert(kelasKeputrianTable).values({
      ...data,
      daerahId,
    })
  );
}

export async function updateKelasKeputrian(
  id: number,
  daerahId: number,
  data: TNamaTanggal
) {
  return await tryCatch(
    "Failed to update Kelas Keputrian",
    db
      .update(kelasKeputrianTable)
      .set(data)
      .where(
        and(
          eq(kelasKeputrianTable.id, id),
          eq(kelasKeputrianTable.daerahId, daerahId)
        )
      )
  );
}

export async function deleteKelasKeputrian(daerahId: number, id: number[]) {
  return await tryCatch(
    "Failed to delete Kelas Keputrian",
    db
      .delete(kelasKeputrianTable)
      .where(
        and(
          inArray(kelasKeputrianTable.id, id),
          eq(kelasKeputrianTable.daerahId, daerahId)
        )
      )
  );
}
