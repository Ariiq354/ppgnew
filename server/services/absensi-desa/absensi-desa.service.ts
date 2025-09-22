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
  absensiGenerusDesaTable,
  kelasDesaTable,
} from "~~/server/database/schema/desa";
import type { TAbsensiGenerusCreate } from "~~/server/utils/dto";
import type { TGenerusDesaAbsensiList } from "./dto/absensi.desa.dto";

const exclude = ["Pindah", "Mondok", "Tugas"];

export async function getAllGenerusDesaExclude(
  desaId: number,
  { limit, page, search, kelasPengajian, kelompokId }: TGenerusDesaAbsensiList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.desaId, desaId),
    sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`,
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(or(like(generusTable.nama, searchCondition)));
  }

  if (kelompokId) {
    conditions.push(eq(generusTable.kelompokId, kelompokId));
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

export async function getAbsensiGenerusDesaByKelasId(
  desaId: number,
  kelasId: number
) {
  try {
    const data = await db
      .select({
        id: absensiGenerusDesaTable.id,
        generusId: absensiGenerusDesaTable.generusId,
        detail: absensiGenerusDesaTable.detail,
        keterangan: absensiGenerusDesaTable.keterangan,
      })
      .from(absensiGenerusDesaTable)
      .leftJoin(
        kelasDesaTable,
        eq(absensiGenerusDesaTable.kelasId, kelasDesaTable.id)
      )
      .leftJoin(
        generusTable,
        eq(generusTable.id, absensiGenerusDesaTable.generusId)
      )
      .where(
        and(
          eq(absensiGenerusDesaTable.kelasId, kelasId),
          eq(kelasDesaTable.desaId, desaId),
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

export async function getCountAbsensiGenerusDesa(
  desaId: number,
  kelasPengajian: string
) {
  try {
    const [data] = await db
      .select({
        count: count(),
      })
      .from(absensiGenerusDesaTable)
      .leftJoin(
        kelasDesaTable,
        eq(absensiGenerusDesaTable.kelasId, kelasDesaTable.id)
      )
      .leftJoin(
        generusTable,
        eq(generusTable.id, absensiGenerusDesaTable.generusId)
      )
      .where(
        and(
          eq(kelasDesaTable.desaId, desaId),
          sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`,
          eq(kelasDesaTable.nama, kelasPengajian)
        )
      );

    return data!.count;
  } catch (error) {
    console.error("Failed to get Count Absensi", error);
    throw InternalError;
  }
}

export async function getCountGenerusDesa(desaId: number) {
  try {
    return await db.$count(
      generusTable,
      and(
        eq(generusTable.desaId, desaId),
        sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`
      )
    );
  } catch (error) {
    console.error("Failed to get Count Generus", error);
    throw InternalError;
  }
}

export async function getAllGenerusDesaSummary(
  desaId: number,
  { limit, page, search, kelasPengajian, kelompokId }: TGenerusDesaAbsensiList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.desaId, desaId),
    sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`,
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(or(like(generusTable.nama, searchCondition)));
  }

  if (kelompokId) {
    conditions.push(eq(generusTable.kelompokId, kelompokId));
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
      hadir: sql<number>`CAST(SUM(CASE WHEN ${absensiGenerusDesaTable.keterangan} = 'Hadir' THEN 1 ELSE 0 END) AS INT)`,
      izin: sql<number>`CAST(SUM(CASE WHEN ${absensiGenerusDesaTable.keterangan} = 'Izin' THEN 1 ELSE 0 END) AS INT)`,
    })
    .from(generusTable)
    .where(and(...conditions))
    .leftJoin(
      absensiGenerusDesaTable,
      eq(generusTable.id, absensiGenerusDesaTable.generusId)
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

export async function getCountGenerusDesaAbsensi(
  desaId: number,
  kelasPengajian: string
) {
  try {
    return await db.$count(
      generusTable,
      and(
        eq(generusTable.desaId, desaId),
        eq(generusTable.kelasPengajian, kelasPengajian),
        sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`
      )
    );
  } catch (error) {
    console.error("Failed to get Count Generus", error);
    throw InternalError;
  }
}

export async function createAbsensiGenerusDesa(
  kelasId: number,
  desaId: number,
  namaKelas: string,
  data: TAbsensiGenerusCreate
) {
  try {
    const generus = await db.query.generusTable.findFirst({
      where: eq(generusTable.id, data.generusId),
    });

    if (generus?.desaId !== desaId) {
      throw createError({
        statusCode: 403,
        message: "Tidak ada generus di desa ini",
      });
    }

    if (generus?.kelasPengajian !== namaKelas) {
      throw createError({
        statusCode: 400,
        message: "Generus beda tingkat kelas pengajian",
      });
    }

    return await db.insert(absensiGenerusDesaTable).values({
      ...data,
      kelasId,
    });
  } catch (error) {
    console.error("Failed to create Absensi Generus", error);
    throw InternalError;
  }
}

export async function updateAbsensiGenerusDesa(
  id: number,
  kelasId: number,
  desaId: number,
  namaKelas: string,
  data: TAbsensiGenerusCreate
) {
  try {
    const generus = await db.query.generusTable.findFirst({
      where: eq(generusTable.id, data.generusId),
    });

    if (generus?.desaId !== desaId) {
      throw createError({
        statusCode: 403,
        message: "Tidak ada generus di desa ini",
      });
    }

    if (generus?.kelasPengajian !== namaKelas) {
      throw createError({
        statusCode: 400,
        message: "Generus beda tingkat kelas pengajian",
      });
    }

    return await db
      .update(absensiGenerusDesaTable)
      .set(data)
      .where(
        and(
          eq(absensiGenerusDesaTable.id, id),
          eq(absensiGenerusDesaTable.kelasId, kelasId)
        )
      );
  } catch (error) {
    console.error("Failed to Update Absensi Generus", error);
    throw InternalError;
  }
}
export async function deleteAbsensiGenerusDesa(id: number[], kelasId: number) {
  try {
    return await db
      .delete(absensiGenerusDesaTable)
      .where(
        and(
          inArray(absensiGenerusDesaTable.id, id),
          eq(absensiGenerusDesaTable.kelasId, kelasId)
        )
      );
  } catch (error) {
    console.error("Failed to delete Absensi Generus", error);
    throw InternalError;
  }
}
