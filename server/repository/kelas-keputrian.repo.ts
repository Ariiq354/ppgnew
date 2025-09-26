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

export async function getAllKelasKeputrianExport(daerahId: number) {
  return assertNoErr(
    "Failed to export Kelas Keputrian data",
    await to(
      db
        .select({
          nama: kelasKeputrianTable.nama,
          tanggal: kelasKeputrianTable.tanggal,
        })
        .from(kelasKeputrianTable)
        .where(eq(kelasKeputrianTable.daerahId, daerahId))
    )
  );
}

export async function getKelasKeputrianById(id: number) {
  const data = assertNoErr(
    "Failed to get Kelas Keputrian By Id",
    await to(
      db.query.kelasKeputrianTable.findFirst({
        where: eq(kelasKeputrianTable.id, id),
      })
    )
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

  const data = assertNoErr(
    "Failed to get all Kelas Keputrian options",
    await to(
      db
        .select({
          id: kelasKeputrianTable.id,
          nama: kelasKeputrianTable.nama,
          tanggal: kelasKeputrianTable.tanggal,
        })
        .from(kelasKeputrianTable)
        .where(and(...conditions))
    )
  );

  return { data };
}

export async function getCountKelasKeputrian(
  daerahId: number,
  kelasPengajian: string
) {
  return assertNoErr(
    "Failed to get count of Kelas Keputrian",
    await to(
      db.$count(
        kelasKeputrianTable,
        and(
          eq(kelasKeputrianTable.daerahId, daerahId),
          eq(kelasKeputrianTable.nama, kelasPengajian)
        )
      )
    )
  );
}

export async function createKelasKeputrian(
  daerahId: number,
  data: TNamaTanggal
) {
  return assertNoErr(
    "Failed to create Kelas Keputrian",
    await to(
      db.insert(kelasKeputrianTable).values({
        ...data,
        daerahId,
      })
    )
  );
}

export async function updateKelasKeputrian(
  id: number,
  daerahId: number,
  data: TNamaTanggal
) {
  return assertNoErr(
    "Failed to update Kelas Keputrian",
    await to(
      db
        .update(kelasKeputrianTable)
        .set(data)
        .where(
          and(
            eq(kelasKeputrianTable.id, id),
            eq(kelasKeputrianTable.daerahId, daerahId)
          )
        )
    )
  );
}

export async function deleteKelasKeputrian(daerahId: number, id: number[]) {
  return assertNoErr(
    "Failed to delete Kelas Keputrian",
    await to(
      db
        .delete(kelasKeputrianTable)
        .where(
          and(
            inArray(kelasKeputrianTable.id, id),
            eq(kelasKeputrianTable.daerahId, daerahId)
          )
        )
    )
  );
}
