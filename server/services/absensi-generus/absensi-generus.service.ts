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
import {
  absensiGenerusTable,
  generusTable,
  kelasTable,
} from "~~/server/database/schema/generus";
import type {
  TAbsensiGenerusCreate,
  TGenerusAbsensiList,
} from "./dto/absensi-generus.dto";

const exclude = ["Pindah", "Mondok", "Tugas"];

export async function getAllGenerusExclude(
  kelompokId: number,
  { limit, page, search, kelasPengajian }: TGenerusAbsensiList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.kelompokId, kelompokId),
    sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`,
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(or(like(generusTable.nama, searchCondition)));
  }

  if (kelasPengajian === "Muda-mudi") {
    conditions.push(
      inArray(generusTable.kelasPengajian, [
        "Remaja",
        "Pranikah",
        "Usia Mandiri",
      ])
    );
  } else {
    conditions.push(eq(generusTable.kelasPengajian, kelasPengajian));
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
    console.error("Failed to get List Generus Absensi", error);
    throw InternalError;
  }
}

export async function getAbsensiGenerusByKelasId(
  kelompokId: number,
  kelasId: number
) {
  try {
    const data = await db
      .select({
        id: absensiGenerusTable.id,
        generusId: absensiGenerusTable.generusId,
        detail: absensiGenerusTable.detail,
        keterangan: absensiGenerusTable.keterangan,
      })
      .from(absensiGenerusTable)
      .leftJoin(kelasTable, eq(absensiGenerusTable.kelasId, kelasTable.id))
      .leftJoin(
        generusTable,
        eq(generusTable.id, absensiGenerusTable.generusId)
      )
      .where(
        and(
          eq(absensiGenerusTable.kelasId, kelasId),
          eq(kelasTable.kelompokId, kelompokId),
          sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`
        )
      );

    return {
      data,
    };
  } catch (error) {
    console.error("Failed to get Absensi Generus", error);
    throw InternalError;
  }
}

export async function getAbsensiGenerusByKelompokId(kelompokId: number) {
  try {
    const data = await db
      .select({
        id: absensiGenerusTable.id,
        generusId: absensiGenerusTable.generusId,
        kelasPengajian: generusTable.kelasPengajian,
        detail: absensiGenerusTable.detail,
        keterangan: absensiGenerusTable.keterangan,
      })
      .from(absensiGenerusTable)
      .leftJoin(kelasTable, eq(absensiGenerusTable.kelasId, kelasTable.id))
      .leftJoin(
        generusTable,
        eq(generusTable.id, absensiGenerusTable.generusId)
      )
      .where(
        and(
          eq(kelasTable.kelompokId, kelompokId),
          sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`
        )
      );

    return data;
  } catch (error) {
    console.error("Failed to get Absensi Generus By Kelompok Id", error);
    throw InternalError;
  }
}

export async function getCountAbsensiGenerus(
  kelompokId: number,
  kelasPengajian: string
) {
  try {
    const [data] = await db
      .select({
        count: count(),
      })
      .from(absensiGenerusTable)
      .leftJoin(kelasTable, eq(absensiGenerusTable.kelasId, kelasTable.id))
      .leftJoin(
        generusTable,
        eq(generusTable.id, absensiGenerusTable.generusId)
      )
      .where(
        and(
          eq(kelasTable.kelompokId, kelompokId),
          sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`,
          eq(kelasTable.nama, kelasPengajian)
        )
      );

    return data!.count;
  } catch (error) {
    console.error("Failed to get Count Absensi", error);
    throw InternalError;
  }
}

export async function getCountGenerus(kelompokId: number) {
  try {
    return await db.$count(
      generusTable,
      and(
        eq(generusTable.kelompokId, kelompokId),
        sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`
      )
    );
  } catch (error) {
    console.error("Failed to get Count Generus", error);
    throw InternalError;
  }
}

export async function getAllGenerusAbsensi(
  kelompokId: number,
  { limit, page, search, kelasPengajian }: TGenerusAbsensiList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.kelompokId, kelompokId),
    sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`,
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(or(like(generusTable.nama, searchCondition)));
  }

  if (kelasPengajian === "Muda-mudi") {
    conditions.push(
      inArray(generusTable.kelasPengajian, [
        "Remaja",
        "Pranikah",
        "Usia Mandiri",
      ])
    );
  } else {
    conditions.push(eq(generusTable.kelasPengajian, kelasPengajian));
  }

  const query = db
    .select({
      id: generusTable.id,
      nama: generusTable.nama,
      hadir: sql<number>`CAST(SUM(CASE WHEN ${absensiGenerusTable.keterangan} = 'Hadir' THEN 1 ELSE 0 END) AS INT)`,
      izin: sql<number>`CAST(SUM(CASE WHEN ${absensiGenerusTable.keterangan} = 'Izin' THEN 1 ELSE 0 END) AS INT)`,
    })
    .from(generusTable)
    .where(and(...conditions))
    .leftJoin(
      absensiGenerusTable,
      eq(generusTable.id, absensiGenerusTable.generusId)
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
    console.error("Failed to get List Generus Absensi", error);
    throw InternalError;
  }
}

export async function getCountGenerusAbsensi(
  kelompokId: number,
  kelasPengajian: string
) {
  try {
    const conditions: (SQL<unknown> | undefined)[] = [
      eq(generusTable.kelompokId, kelompokId),
      sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`,
    ];

    if (kelasPengajian === "Muda-mudi") {
      conditions.push(
        inArray(generusTable.kelasPengajian, [
          "Remaja",
          "Pranikah",
          "Usia Mandiri",
        ])
      );
    } else {
      conditions.push(eq(generusTable.kelasPengajian, kelasPengajian));
    }

    return await db.$count(generusTable, and(...conditions));
  } catch (error) {
    console.error("Failed to get Count Generus", error);
    throw InternalError;
  }
}

export async function createAbsensiGenerus(
  kelasId: number,
  kelompokId: number,
  namaKelas: string,
  data: TAbsensiGenerusCreate
) {
  try {
    const generus = await db.query.generusTable.findFirst({
      where: eq(generusTable.id, data.generusId),
    });

    if (generus?.kelompokId !== kelompokId) {
      throw createError({
        statusCode: 403,
        message: "Tidak ada generus di kelompok ini",
      });
    }

    if (generus?.kelasPengajian !== namaKelas) {
      throw createError({
        statusCode: 400,
        message: "Generus beda tingkat kelas pengajian",
      });
    }

    return await db.insert(absensiGenerusTable).values({
      ...data,
      kelasId,
    });
  } catch (error) {
    console.error("Failed to create Absensi Generus", error);
    throw InternalError;
  }
}

export async function updateAbsensiGenerus(
  id: number,
  kelasId: number,
  kelompokId: number,
  namaKelas: string,
  data: TAbsensiGenerusCreate
) {
  try {
    const generus = await db.query.generusTable.findFirst({
      where: eq(generusTable.id, data.generusId),
    });

    if (generus?.kelompokId !== kelompokId) {
      throw createError({
        statusCode: 403,
        message: "Tidak ada generus di kelompok ini",
      });
    }

    if (generus?.kelasPengajian !== namaKelas) {
      throw createError({
        statusCode: 400,
        message: "Generus beda tingkat kelas pengajian",
      });
    }

    return await db
      .update(absensiGenerusTable)
      .set(data)
      .where(
        and(
          eq(absensiGenerusTable.id, id),
          eq(absensiGenerusTable.kelasId, kelasId)
        )
      );
  } catch (error) {
    console.error("Failed to Update Absensi Generus", error);
    throw InternalError;
  }
}
export async function deleteAbsensiGenerus(id: number[], kelasId: number) {
  try {
    return await db
      .delete(absensiGenerusTable)
      .where(
        and(
          inArray(absensiGenerusTable.id, id),
          eq(absensiGenerusTable.kelasId, kelasId)
        )
      );
  } catch (error) {
    console.error("Failed to delete Absensi Generus", error);
    throw InternalError;
  }
}
