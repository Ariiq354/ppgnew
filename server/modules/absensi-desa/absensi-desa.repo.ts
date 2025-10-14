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
import type { TGenerusDesaAbsensiList } from "./absensi-desa.dto";

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

  const total = await tryCatch(
    "Failed to get total count of Generus Absensi",
    db.$count(query)
  );
  const data = await tryCatch(
    "Failed to get list of Generus Absensi",
    query.limit(limit).offset(offset)
  );

  return {
    data,
    total,
  };
}

export async function getAbsensiGenerusDesaByKelasId(
  desaId: number,
  kelasId: number
) {
  const data = await tryCatch(
    "Failed to get Absensi Generus",
    db
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
      )
  );

  return {
    data,
  };
}

export async function getCountAbsensiGenerusDesa(
  desaId: number,
  kelasPengajian: string
) {
  const [data] = await tryCatch(
    "Failed to get Count Absensi",
    db
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
      )
  );

  return data!.count;
}

export async function getCountGenerusDesa(desaId: number) {
  return await tryCatch(
    "Failed to get Count Generus",
    db.$count(
      generusTable,
      and(
        eq(generusTable.desaId, desaId),
        sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`
      )
    )
  );
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

  const total = await tryCatch(
    "Failed to get total count of Generus Absensi",
    db.$count(query)
  );
  const data = await tryCatch(
    "Failed to get list of Generus Absensi",
    query.limit(limit).offset(offset)
  );

  return {
    data,
    total,
  };
}

export async function getCountGenerusDesaAbsensi(
  desaId: number,
  kelasPengajian: string
) {
  return await tryCatch(
    "Failed to get Count Generus",
    db.$count(
      generusTable,
      and(
        eq(generusTable.desaId, desaId),
        eq(generusTable.kelasPengajian, kelasPengajian),
        sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`
      )
    )
  );
}

export async function getAbsensiGenerusByDesaId(desaId: number) {
  return await tryCatch(
    "Failed to get Absensi Generus Desa By Desa Id",
    db
      .select({
        id: absensiGenerusDesaTable.id,
        generusId: absensiGenerusDesaTable.generusId,
        kelasPengajian: generusTable.kelasPengajian,
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
          eq(kelasDesaTable.desaId, desaId),
          sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`
        )
      )
  );
}

export async function createAbsensiGenerusDesa(
  kelasId: number,
  desaId: number,
  namaKelas: string,
  data: TAbsensiGenerusCreate
) {
  const generus = await tryCatch(
    "Failed to find Generus for Absensi creation",
    db.query.generusTable.findFirst({
      where: eq(generusTable.id, data.generusId),
    })
  );

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

  return await tryCatch(
    "Failed to create Absensi Generus",
    db.insert(absensiGenerusDesaTable).values({
      ...data,
      kelasId,
    })
  );
}

export async function updateAbsensiGenerusDesa(
  id: number,
  kelasId: number,
  desaId: number,
  namaKelas: string,
  data: TAbsensiGenerusCreate
) {
  const generus = await tryCatch(
    "Failed to find Generus for Absensi update",
    db.query.generusTable.findFirst({
      where: eq(generusTable.id, data.generusId),
    })
  );

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

  return await tryCatch(
    "Failed to Update Absensi Generus",
    db
      .update(absensiGenerusDesaTable)
      .set(data)
      .where(
        and(
          eq(absensiGenerusDesaTable.id, id),
          eq(absensiGenerusDesaTable.kelasId, kelasId)
        )
      )
  );
}
export async function deleteAbsensiGenerusDesa(id: number[], kelasId: number) {
  return await tryCatch(
    "Failed to delete Absensi Generus",
    db
      .delete(absensiGenerusDesaTable)
      .where(
        and(
          inArray(absensiGenerusDesaTable.id, id),
          eq(absensiGenerusDesaTable.kelasId, kelasId)
        )
      )
  );
}
