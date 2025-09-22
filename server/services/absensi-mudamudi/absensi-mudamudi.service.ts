import {
  and,
  count,
  eq,
  inArray,
  like,
  or,
  Param,
  type SQL,
  sql,
} from "drizzle-orm";
import { db } from "~~/server/database";
import { generusTable } from "~~/server/database/schema/generus";
import {
  absensiGenerusMudaMudiTable,
  kelasMudaMudiTable,
} from "~~/server/database/schema/mudamudi";
import type {
  TAbsensiGenerusCreate,
  TGenerusAbsensiList,
} from "~~/server/utils/dto";

const exclude = ["Pindah", "Mondok", "Tugas"];

export async function getAllMudamudiExclude(
  daerahId: number,
  { limit, page, search, kelasPengajian }: TGenerusAbsensiList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.daerahId, daerahId),
    sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`,
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(or(like(generusTable.nama, searchCondition)));
  }

  if (kelasPengajian === "Usia Mandiri") {
    conditions.push(eq(generusTable.kelasPengajian, "Usia Mandiri"));
  } else {
    conditions.push(
      inArray(generusTable.kelasPengajian, ["Remaja", "Pranikah"])
    );
  }

  const query = db
    .select({
      id: generusTable.id,
      nama: generusTable.nama,
    })
    .from(generusTable)
    .where(and(...conditions));

  try {
    const total = await db.$count(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Mudamudi Absensi", error);
    throw InternalError;
  }
}

export async function getAbsensiMudamudiByKelasId(
  daerahId: number,
  kelasId: number
) {
  try {
    const data = await db
      .select({
        id: absensiGenerusMudaMudiTable.id,
        generusId: absensiGenerusMudaMudiTable.generusId,
        detail: absensiGenerusMudaMudiTable.detail,
        keterangan: absensiGenerusMudaMudiTable.keterangan,
      })
      .from(absensiGenerusMudaMudiTable)
      .leftJoin(
        kelasMudaMudiTable,
        eq(absensiGenerusMudaMudiTable.kelasId, kelasMudaMudiTable.id)
      )
      .leftJoin(
        generusTable,
        eq(generusTable.id, absensiGenerusMudaMudiTable.generusId)
      )
      .where(
        and(
          eq(absensiGenerusMudaMudiTable.kelasId, kelasId),
          eq(kelasMudaMudiTable.daerahId, daerahId),
          sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`
        )
      );

    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get Absensi Mudamudi", error);
    throw InternalError;
  }
}

export async function getCountAbsensiMudamudi(
  daerahId: number,
  kelasPengajian: string
) {
  try {
    const [data] = await db
      .select({
        count: count(),
      })
      .from(absensiGenerusMudaMudiTable)
      .leftJoin(
        kelasMudaMudiTable,
        eq(absensiGenerusMudaMudiTable.kelasId, kelasMudaMudiTable.id)
      )
      .leftJoin(
        generusTable,
        eq(generusTable.id, absensiGenerusMudaMudiTable.generusId)
      )
      .where(
        and(
          eq(kelasMudaMudiTable.daerahId, daerahId),
          sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`,
          eq(kelasMudaMudiTable.nama, kelasPengajian)
        )
      );

    return data!.count;
  } catch (error) {
    console.error("Failed to get Count Absensi", error);
    throw InternalError;
  }
}

export async function getCountMudamudi(daerahId: number) {
  try {
    return await db.$count(
      generusTable,
      and(
        eq(generusTable.daerahId, daerahId),
        sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`
      )
    );
  } catch (error) {
    console.error("Failed to get Count Mudamudi", error);
    throw InternalError;
  }
}

export async function getAllMudamudiSummary(
  daerahId: number,
  { limit, page, search, kelasPengajian }: TGenerusAbsensiList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.daerahId, daerahId),
    sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`,
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(or(like(generusTable.nama, searchCondition)));
  }

  if (kelasPengajian === "Usia Mandiri") {
    conditions.push(eq(generusTable.kelasPengajian, "Usia Mandiri"));
  } else {
    conditions.push(
      inArray(generusTable.kelasPengajian, ["Remaja", "Pranikah"])
    );
  }

  const query = db
    .select({
      id: generusTable.id,
      nama: generusTable.nama,
      hadir: sql<number>`CAST(SUM(CASE WHEN ${absensiGenerusMudaMudiTable.keterangan} = 'Hadir' THEN 1 ELSE 0 END) AS INT)`,
      izin: sql<number>`CAST(SUM(CASE WHEN ${absensiGenerusMudaMudiTable.keterangan} = 'Izin' THEN 1 ELSE 0 END) AS INT)`,
    })
    .from(generusTable)
    .where(and(...conditions))
    .leftJoin(
      absensiGenerusMudaMudiTable,
      eq(generusTable.id, absensiGenerusMudaMudiTable.generusId)
    )
    .groupBy(generusTable.id, generusTable.nama);

  try {
    const total = await db.$count(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Mudamudi Summary", error);
    throw InternalError;
  }
}

export async function getCountMudamudiAbsensi(
  daerahId: number,
  kelasPengajian: string
) {
  try {
    return await db.$count(
      generusTable,
      and(
        eq(generusTable.daerahId, daerahId),
        eq(generusTable.kelasPengajian, kelasPengajian),
        sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`
      )
    );
  } catch (error) {
    console.error("Failed to get Count Generus", error);
    throw InternalError;
  }
}

export async function createAbsensiMudamudi(
  kelasId: number,
  daerahId: number,
  namaKelas: string,
  data: TAbsensiGenerusCreate
) {
  try {
    const generus = await db.query.generusTable.findFirst({
      where: eq(generusTable.id, data.generusId),
    });

    if (generus?.daerahId !== daerahId) {
      throw createError({
        statusCode: 403,
        message: "Tidak ada generus di daerah ini",
      });
    }

    const allowed =
      namaKelas === "Usia Mandiri" ? ["Usia Mandiri"] : ["Remaja", "Pranikah"];

    if (!allowed.includes(generus?.kelasPengajian ?? "")) {
      throw createError({
        statusCode: 400,
        message: "Generus beda tingkat kelas pengajian",
      });
    }

    return await db.insert(absensiGenerusMudaMudiTable).values({
      ...data,
      kelasId,
    });
  } catch (error) {
    console.error("Failed to create Absensi Generus Mudamudi", error);
    throw InternalError;
  }
}

export async function updateAbsensiMudamudi(
  id: number,
  kelasId: number,
  daerahId: number,
  namaKelas: string,
  data: TAbsensiGenerusCreate
) {
  try {
    const generus = await db.query.generusTable.findFirst({
      where: eq(generusTable.id, data.generusId),
    });

    if (generus?.daerahId !== daerahId) {
      throw createError({
        statusCode: 403,
        message: "Tidak ada generus di kelompok ini",
      });
    }

    const allowed =
      namaKelas === "Usia Mandiri" ? ["Usia Mandiri"] : ["Remaja", "Pranikah"];

    if (!allowed.includes(generus?.kelasPengajian ?? "")) {
      throw createError({
        statusCode: 400,
        message: "Generus beda tingkat kelas pengajian",
      });
    }

    return await db
      .update(absensiGenerusMudaMudiTable)
      .set(data)
      .where(
        and(
          eq(absensiGenerusMudaMudiTable.id, id),
          eq(absensiGenerusMudaMudiTable.kelasId, kelasId)
        )
      );
  } catch (error) {
    console.error("Failed to Update Absensi Mudamudi", error);
    throw InternalError;
  }
}
export async function deleteAbsensiMudamudi(id: number[], kelasId: number) {
  try {
    return await db
      .delete(absensiGenerusMudaMudiTable)
      .where(
        and(
          inArray(absensiGenerusMudaMudiTable.id, id),
          eq(absensiGenerusMudaMudiTable.kelasId, kelasId)
        )
      );
  } catch (error) {
    console.error("Failed to delete Absensi Mudamudi", error);
    throw InternalError;
  }
}
