import { and, eq, inArray, like, or, sql, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { kelasMudaMudiTable } from "~~/server/database/schema/mudamudi";
import type {
  TKelasList,
  TKelasOptionsList,
  TNamaTanggal,
} from "~~/server/utils/dto";

export async function getAllKelasMudamudi(
  daerahId: number,
  { limit, page, search, bulan, tahun, nama }: TKelasList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasMudaMudiTable.daerahId, daerahId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(or(like(kelasMudaMudiTable.nama, searchCondition)));
  }

  if (nama) {
    conditions.push(eq(kelasMudaMudiTable.nama, nama));
  }

  if (bulan) {
    conditions.push(
      eq(sql`extract(month from ${kelasMudaMudiTable.tanggal}::date)`, bulan)
    );
  }

  if (tahun) {
    conditions.push(
      eq(sql`extract(year from ${kelasMudaMudiTable.tanggal}::date)`, tahun)
    );
  }

  const query = db
    .select({
      id: kelasMudaMudiTable.id,
      nama: kelasMudaMudiTable.nama,
      tanggal: kelasMudaMudiTable.tanggal,
    })
    .from(kelasMudaMudiTable)
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

export async function getAllKelasMudamudiExport(daerahId: number) {
  return await tryCatch(
    "Failed to export Kelas Mudamudi data",
    db
      .select({
        nama: kelasMudaMudiTable.nama,
        tanggal: kelasMudaMudiTable.tanggal,
      })
      .from(kelasMudaMudiTable)
      .where(eq(kelasMudaMudiTable.daerahId, daerahId))
  );
}

export async function getKelasMudamudiById(id: number) {
  const data = await tryCatch(
    "Failed to get Kelas Mudamudi By Id",
    db.query.kelasMudaMudiTable.findFirst({
      where: eq(kelasMudaMudiTable.id, id),
    })
  );

  return { data };
}

export async function getAllKelasMudamudiOptions(
  daerahId: number,
  query: TKelasOptionsList
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasMudaMudiTable.daerahId, daerahId),
  ];

  if (query.nama) {
    conditions.push(eq(kelasMudaMudiTable.nama, query.nama));
  }

  const data = await tryCatch(
    "Failed to get all Kelas Mudamudi options",
    db
      .select({
        id: kelasMudaMudiTable.id,
        nama: kelasMudaMudiTable.nama,
        tanggal: kelasMudaMudiTable.tanggal,
      })
      .from(kelasMudaMudiTable)
      .where(and(...conditions))
  );

  return { data };
}

export async function getCountKelasMudamudi(
  daerahId: number,
  kelasPengajian: string
) {
  return await tryCatch(
    "Failed to get count of Kelas Mudamudi",
    db.$count(
      kelasMudaMudiTable,
      and(
        eq(kelasMudaMudiTable.daerahId, daerahId),
        eq(kelasMudaMudiTable.nama, kelasPengajian)
      )
    )
  );
}

export async function createKelasMudamudi(
  daerahId: number,
  data: TNamaTanggal
) {
  return await tryCatch(
    "Failed to create Kelas Mudamudi",
    db.insert(kelasMudaMudiTable).values({
      ...data,
      daerahId,
    })
  );
}

export async function updateKelasMudamudi(
  id: number,
  daerahId: number,
  data: TNamaTanggal
) {
  return await tryCatch(
    "Failed to update Kelas Mudamudi",
    db
      .update(kelasMudaMudiTable)
      .set(data)
      .where(
        and(
          eq(kelasMudaMudiTable.id, id),
          eq(kelasMudaMudiTable.daerahId, daerahId)
        )
      )
  );
}

export async function deleteKelasMudamudi(daerahId: number, id: number[]) {
  return await tryCatch(
    "Failed to delete Kelas Mudamudi",
    db
      .delete(kelasMudaMudiTable)
      .where(
        and(
          inArray(kelasMudaMudiTable.id, id),
          eq(kelasMudaMudiTable.daerahId, daerahId)
        )
      )
  );
}
