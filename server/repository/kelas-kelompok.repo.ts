import { and, eq, inArray, like, or, sql, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { kelasTable } from "~~/server/database/schema/generus";
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

  const total = assertNoErr(
    "Failed to get total count of Kelas",
    await to(db.$count(query))
  );

  const data = assertNoErr(
    "Failed to get list of Kelas",
    await to(query.limit(limit).offset(offset))
  );

  return { data, total };
}

export async function getAllKelasExport(kelompokId: number) {
  return assertNoErr(
    "Failed to export Kelas data",
    await to(
      db
        .select({
          nama: kelasTable.nama,
          tanggal: kelasTable.tanggal,
        })
        .from(kelasTable)
        .where(eq(kelasTable.kelompokId, kelompokId))
    )
  );
}

export async function getKelasById(id: number) {
  const data = assertNoErr(
    "Failed to get Kelas by ID",
    await to(
      db.query.kelasTable.findFirst({
        where: eq(kelasTable.id, id),
      })
    )
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

  const data = assertNoErr(
    "Failed to get all Kelas options",
    await to(
      db
        .select({
          id: kelasTable.id,
          nama: kelasTable.nama,
          tanggal: kelasTable.tanggal,
        })
        .from(kelasTable)
        .where(and(...conditions))
    )
  );

  return { data };
}

export async function getCountKelas(
  kelompokId: number,
  kelasPengajian: string
) {
  return assertNoErr(
    "Failed to get count of Kelas",
    await to(
      db.$count(
        kelasTable,
        and(
          eq(kelasTable.kelompokId, kelompokId),
          eq(kelasTable.nama, kelasPengajian)
        )
      )
    )
  );
}

export async function getKelasByKelompokId(kelompokId: number) {
  return assertNoErr(
    "Failed to get Kelas by Kelompok ID",
    await to(
      db
        .select({
          id: kelasTable.id,
          nama: kelasTable.nama,
        })
        .from(kelasTable)
        .where(eq(kelasTable.kelompokId, kelompokId))
    )
  );
}

export async function createKelas(kelompokId: number, data: TNamaTanggal) {
  return assertNoErr(
    "Failed to create Kelas",
    await to(
      db.insert(kelasTable).values({
        ...data,
        kelompokId,
      })
    )
  );
}

export async function updateKelas(
  id: number,
  kelompokId: number,
  data: TNamaTanggal
) {
  return assertNoErr(
    "Failed to update Kelas",
    await to(
      db
        .update(kelasTable)
        .set(data)
        .where(
          and(eq(kelasTable.id, id), eq(kelasTable.kelompokId, kelompokId))
        )
    )
  );
}

export async function deleteKelas(kelompokId: number, id: number[]) {
  return assertNoErr(
    "Failed to delete Kelas",
    await to(
      db
        .delete(kelasTable)
        .where(
          and(inArray(kelasTable.id, id), eq(kelasTable.kelompokId, kelompokId))
        )
    )
  );
}
