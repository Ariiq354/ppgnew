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
import type {
  TAbsensiKeputrianCreate,
  TKeputrianAbsensiList,
} from "./dto/absensi-keputrian.dto";
import {
  absensiGenerusKeputrianTable,
  kelasKeputrianTable,
} from "~~/server/database/schema/keputrian";

const exclude = ["Pindah", "Mondok", "Tugas"];

export async function getAllKeputrianExclude(
  daerahId: number,
  { limit, page, search, kelasPengajian }: TKeputrianAbsensiList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.daerahId, daerahId),
    eq(generusTable.gender, "Perempuan"),
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
    console.error("Failed to get List Keputrian Absensi", error);
    throw InternalError;
  }
}

export async function getAbsensiKeputrianByKelasId(
  daerahId: number,
  kelasId: number
) {
  try {
    const data = await db
      .select({
        id: absensiGenerusKeputrianTable.id,
        generusId: absensiGenerusKeputrianTable.generusId,
        detail: absensiGenerusKeputrianTable.detail,
        keterangan: absensiGenerusKeputrianTable.keterangan,
      })
      .from(absensiGenerusKeputrianTable)
      .leftJoin(
        kelasKeputrianTable,
        eq(absensiGenerusKeputrianTable.kelasId, kelasKeputrianTable.id)
      )
      .leftJoin(
        generusTable,
        eq(generusTable.id, absensiGenerusKeputrianTable.generusId)
      )
      .where(
        and(
          eq(absensiGenerusKeputrianTable.kelasId, kelasId),
          eq(kelasKeputrianTable.daerahId, daerahId),
          sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`
        )
      );

    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get Absensi Keputrian", error);
    throw InternalError;
  }
}

export async function getCountAbsensiKeputrian(
  daerahId: number,
  kelasPengajian: string
) {
  try {
    const [data] = await db
      .select({
        count: count(),
      })
      .from(absensiGenerusKeputrianTable)
      .leftJoin(
        kelasKeputrianTable,
        eq(absensiGenerusKeputrianTable.kelasId, kelasKeputrianTable.id)
      )
      .leftJoin(
        generusTable,
        eq(generusTable.id, absensiGenerusKeputrianTable.generusId)
      )
      .where(
        and(
          eq(kelasKeputrianTable.daerahId, daerahId),
          sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`,
          eq(kelasKeputrianTable.nama, kelasPengajian)
        )
      );

    return data!.count;
  } catch (error) {
    console.error("Failed to get Count Absensi", error);
    throw InternalError;
  }
}

export async function getCountKeputrian(daerahId: number) {
  try {
    return await db.$count(
      generusTable,
      and(
        eq(generusTable.daerahId, daerahId),
        eq(generusTable.gender, "Perempuan"),
        sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`
      )
    );
  } catch (error) {
    console.error("Failed to get Count Keputrian", error);
    throw InternalError;
  }
}

export async function getAllKeputrianSummary(
  daerahId: number,
  { limit, page, search, kelasPengajian }: TKeputrianAbsensiList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.daerahId, daerahId),
    eq(generusTable.gender, "Perempuan"),
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
      hadir: sql<number>`CAST(SUM(CASE WHEN ${absensiGenerusKeputrianTable.keterangan} = 'Hadir' THEN 1 ELSE 0 END) AS INT)`,
      izin: sql<number>`CAST(SUM(CASE WHEN ${absensiGenerusKeputrianTable.keterangan} = 'Izin' THEN 1 ELSE 0 END) AS INT)`,
    })
    .from(generusTable)
    .where(and(...conditions))
    .leftJoin(
      absensiGenerusKeputrianTable,
      eq(generusTable.id, absensiGenerusKeputrianTable.generusId)
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
    console.error("Failed to get List Keputrian Summary", error);
    throw InternalError;
  }
}

export async function getCountKeputrianAbsensi(
  daerahId: number,
  kelasPengajian: string
) {
  try {
    return await db.$count(
      generusTable,
      and(
        eq(generusTable.daerahId, daerahId),
        eq(generusTable.gender, "Perempuan"),
        eq(generusTable.kelasPengajian, kelasPengajian),
        sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`
      )
    );
  } catch (error) {
    console.error("Failed to get Count Generus", error);
    throw InternalError;
  }
}

export async function createAbsensiKeputrian(
  kelasId: number,
  daerahId: number,
  namaKelas: string,
  data: TAbsensiKeputrianCreate
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

    return await db.insert(absensiGenerusKeputrianTable).values({
      ...data,
      kelasId,
    });
  } catch (error) {
    console.error("Failed to create Absensi Generus Keputrian", error);
    throw InternalError;
  }
}

export async function updateAbsensiKeputrian(
  id: number,
  kelasId: number,
  daerahId: number,
  namaKelas: string,
  data: TAbsensiKeputrianCreate
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
      .update(absensiGenerusKeputrianTable)
      .set(data)
      .where(
        and(
          eq(absensiGenerusKeputrianTable.id, id),
          eq(absensiGenerusKeputrianTable.kelasId, kelasId)
        )
      );
  } catch (error) {
    console.error("Failed to Update Absensi Keputrian", error);
    throw InternalError;
  }
}
export async function deleteAbsensiKeputrian(id: number[], kelasId: number) {
  try {
    return await db
      .delete(absensiGenerusKeputrianTable)
      .where(
        and(
          inArray(absensiGenerusKeputrianTable.id, id),
          eq(absensiGenerusKeputrianTable.kelasId, kelasId)
        )
      );
  } catch (error) {
    console.error("Failed to delete Absensi Keputrian", error);
    throw InternalError;
  }
}
