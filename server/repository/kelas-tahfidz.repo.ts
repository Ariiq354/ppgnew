import { and, eq, inArray, like, or, sql, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { kelasTahfidzTable } from "~~/server/database/schema/tahfidz";
import type {
  TKelasList,
  TKelasOptionsList,
  TNamaTanggal,
} from "~~/server/utils/dto";

export async function getAllKelasTahfidz(
  daerahId: number,
  { limit, page, search, bulan, tahun, nama }: TKelasList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasTahfidzTable.daerahId, daerahId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(or(like(kelasTahfidzTable.nama, searchCondition)));
  }

  if (nama) {
    conditions.push(eq(kelasTahfidzTable.nama, nama));
  }

  if (bulan) {
    conditions.push(
      eq(sql`extract(month from ${kelasTahfidzTable.tanggal}::date)`, bulan)
    );
  }

  if (tahun) {
    conditions.push(
      eq(sql`extract(year from ${kelasTahfidzTable.tanggal}::date)`, tahun)
    );
  }

  const query = db
    .select({
      id: kelasTahfidzTable.id,
      nama: kelasTahfidzTable.nama,
      tanggal: kelasTahfidzTable.tanggal,
    })
    .from(kelasTahfidzTable)
    .where(and(...conditions));

  const total = await tryCatch(
    "Failed to get total count of Kelas",
    await to(db.$count(query))
  );

  const data = await tryCatch(
    "Failed to get list of Kelas",
    await to(query.limit(limit).offset(offset))
  );

  return { data, total };
}

export async function getAllKelasTahfidzExport(daerahId: number) {
  return await tryCatch(
    "Failed to export Kelas Tahfidz data",
    await to(
      db
        .select({
          nama: kelasTahfidzTable.nama,
          tanggal: kelasTahfidzTable.tanggal,
        })
        .from(kelasTahfidzTable)
        .where(eq(kelasTahfidzTable.daerahId, daerahId))
    )
  );
}

export async function getKelasTahfidzById(id: number) {
  const data = await tryCatch(
    "Failed to get Kelas Tahfidz By Id",
    await to(
      db.query.kelasTahfidzTable.findFirst({
        where: eq(kelasTahfidzTable.id, id),
      })
    )
  );

  return { data };
}

export async function getAllKelasTahfidzOptions(
  daerahId: number,
  query: TKelasOptionsList
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasTahfidzTable.daerahId, daerahId),
  ];

  if (query.nama) {
    conditions.push(eq(kelasTahfidzTable.nama, query.nama));
  }

  const data = await tryCatch(
    "Failed to get all Kelas Tahfidz options",
    await to(
      db
        .select({
          id: kelasTahfidzTable.id,
          nama: kelasTahfidzTable.nama,
          tanggal: kelasTahfidzTable.tanggal,
        })
        .from(kelasTahfidzTable)
        .where(and(...conditions))
    )
  );

  return { data };
}

export async function getCountKelasTahfidz(
  daerahId: number,
  kelasPengajian: string
) {
  return await tryCatch(
    "Failed to get count of Kelas Tahfidz",
    await to(
      db.$count(
        kelasTahfidzTable,
        and(
          eq(kelasTahfidzTable.daerahId, daerahId),
          eq(kelasTahfidzTable.nama, kelasPengajian)
        )
      )
    )
  );
}

export async function createKelasTahfidz(daerahId: number, data: TNamaTanggal) {
  return await tryCatch(
    "Failed to create Kelas Tahfidz",
    await to(
      db.insert(kelasTahfidzTable).values({
        ...data,
        daerahId,
      })
    )
  );
}

export async function updateKelasTahfidz(
  id: number,
  daerahId: number,
  data: TNamaTanggal
) {
  return await tryCatch(
    "Failed to update Kelas Tahfidz",
    await to(
      db
        .update(kelasTahfidzTable)
        .set(data)
        .where(
          and(
            eq(kelasTahfidzTable.id, id),
            eq(kelasTahfidzTable.daerahId, daerahId)
          )
        )
    )
  );
}

export async function deleteKelasTahfidz(daerahId: number, id: number[]) {
  return await tryCatch(
    "Failed to delete Kelas Tahfidz",
    await to(
      db
        .delete(kelasTahfidzTable)
        .where(
          and(
            inArray(kelasTahfidzTable.id, id),
            eq(kelasTahfidzTable.daerahId, daerahId)
          )
        )
    )
  );
}
