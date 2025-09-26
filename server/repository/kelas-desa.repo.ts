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

  const total = assertNoErr(
    "Failed to get total count of Kelas Desa",
    await to(db.$count(query))
  );

  const data = assertNoErr(
    "Failed to get list of Kelas Desa",
    await to(query.limit(limit).offset(offset))
  );

  return { data, total };
}

export async function getAllKelasDesaExport(desaId: number) {
  return assertNoErr(
    "Failed to export Kelas Desa data",
    await to(
      db
        .select({
          nama: kelasDesaTable.nama,
          tanggal: kelasDesaTable.tanggal,
        })
        .from(kelasDesaTable)
        .where(eq(kelasDesaTable.desaId, desaId))
    )
  );
}

export async function getKelasDesaById(id: number) {
  const data = assertNoErr(
    "Failed to get Kelas Desa By Id",
    await to(
      db.query.kelasDesaTable.findFirst({
        where: eq(kelasDesaTable.id, id),
      })
    )
  );

  return { data };
}

export async function getKelasByDesaId(desaId: number) {
  return assertNoErr(
    "Failed to get Kelas Desa By Desa Id",
    await to(
      db
        .select({
          id: kelasDesaTable.id,
          nama: kelasDesaTable.nama,
        })
        .from(kelasDesaTable)
        .where(eq(kelasDesaTable.desaId, desaId))
    )
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

  const data = assertNoErr(
    "Failed to get all Kelas Desa options",
    await to(
      db
        .select({
          id: kelasDesaTable.id,
          nama: kelasDesaTable.nama,
          tanggal: kelasDesaTable.tanggal,
        })
        .from(kelasDesaTable)
        .where(and(...conditions))
    )
  );

  return { data };
}

export async function getCountKelasDesa(
  desaId: number,
  kelasDesaPengajian: string
) {
  return assertNoErr(
    "Failed to get count of Kelas Desa",
    await to(
      db.$count(
        kelasDesaTable,
        and(
          eq(kelasDesaTable.desaId, desaId),
          eq(kelasDesaTable.nama, kelasDesaPengajian)
        )
      )
    )
  );
}

export async function createKelasDesa(desaId: number, data: TNamaTanggal) {
  return assertNoErr(
    "Failed to create Kelas Desa",
    await to(
      db.insert(kelasDesaTable).values({
        ...data,
        desaId,
      })
    )
  );
}

export async function updateKelasDesa(
  id: number,
  desaId: number,
  data: TNamaTanggal
) {
  return assertNoErr(
    "Failed to update Kelas Desa",
    await to(
      db
        .update(kelasDesaTable)
        .set(data)
        .where(
          and(eq(kelasDesaTable.id, id), eq(kelasDesaTable.desaId, desaId))
        )
    )
  );
}

export async function deleteKelasDesa(desaId: number, id: number[]) {
  return assertNoErr(
    "Failed to delete Kelas Desa",
    await to(
      db
        .delete(kelasDesaTable)
        .where(
          and(inArray(kelasDesaTable.id, id), eq(kelasDesaTable.desaId, desaId))
        )
    )
  );
}
