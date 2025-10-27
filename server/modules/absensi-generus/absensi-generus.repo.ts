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
} from "~~/server/utils/dto";
import { exclude } from "~~/shared/contants";

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

export async function getAbsensiGenerusByKelasId(
  kelompokId: number,
  kelasId: number,
  kelasPengajian: string
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(absensiGenerusTable.kelasId, kelasId),
    eq(kelasTable.kelompokId, kelompokId),
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

  const data = await tryCatch(
    "Failed to get Absensi Generus",
    db
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
      .where(and(...conditions))
  );

  return data;
}

export async function getAbsensiGenerusByKelompokId(kelompokId: number) {
  return await tryCatch(
    "Failed to get Absensi Generus By Kelompok Id",
    db
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
      )
  );
}

export async function getCountAbsensiGenerus(
  kelompokId: number,
  kelasPengajian: string
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasTable.kelompokId, kelompokId),
    sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`,
    eq(kelasTable.nama, kelasPengajian),
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

  const [data] = await tryCatch(
    "Failed to get Count Absensi",
    db
      .select({
        count: count(),
      })
      .from(absensiGenerusTable)
      .leftJoin(kelasTable, eq(absensiGenerusTable.kelasId, kelasTable.id))
      .leftJoin(
        generusTable,
        eq(generusTable.id, absensiGenerusTable.generusId)
      )
      .where(and(...conditions))
  );

  return data!.count;
}

export async function getCountGenerus(kelompokId: number) {
  return await tryCatch(
    "Failed to get Count Generus",
    db.$count(
      generusTable,
      and(
        eq(generusTable.kelompokId, kelompokId),
        sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`
      )
    )
  );
}

export async function getAllGenerusSummary(
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
      hadir: sql<number>`CAST(SUM(CASE WHEN ${absensiGenerusTable.keterangan} = 'Hadir' AND ${kelasTable.nama} = ${kelasPengajian} THEN 1 ELSE 0 END) AS INT)`,
      izin: sql<number>`CAST(SUM(CASE WHEN ${absensiGenerusTable.keterangan} = 'Izin' AND ${kelasTable.nama} = ${kelasPengajian} THEN 1 ELSE 0 END) AS INT)`,
    })
    .from(generusTable)
    .where(and(...conditions))
    .leftJoin(
      absensiGenerusTable,
      eq(generusTable.id, absensiGenerusTable.generusId)
    )
    .leftJoin(kelasTable, eq(absensiGenerusTable.kelasId, kelasTable.id))
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

export async function getCountGenerusAbsensi(
  kelompokId: number,
  kelasPengajian: string
) {
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

  return await tryCatch(
    "Failed to get Count Generus",
    db.$count(generusTable, and(...conditions))
  );
}

export async function createAbsensiGenerus(
  kelasId: number,
  kelompokId: number,
  namaKelas: string,
  data: TAbsensiGenerusCreate
) {
  const generus = await tryCatch(
    "Failed to find Generus for Absensi creation",
    db.query.generusTable.findFirst({
      where: eq(generusTable.id, data.generusId),
    })
  );

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

  return await tryCatch(
    "Failed to create Absensi Generus",
    db.insert(absensiGenerusTable).values({
      ...data,
      kelasId,
    })
  );
}

export async function updateAbsensiGenerus(
  id: number,
  kelasId: number,
  kelompokId: number,
  namaKelas: string,
  data: TAbsensiGenerusCreate
) {
  const generus = await tryCatch(
    "Failed to find Generus for Absensi update",
    db.query.generusTable.findFirst({
      where: eq(generusTable.id, data.generusId),
    })
  );

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

  return await tryCatch(
    "Failed to Update Absensi Generus",
    db
      .update(absensiGenerusTable)
      .set(data)
      .where(
        and(
          eq(absensiGenerusTable.id, id),
          eq(absensiGenerusTable.kelasId, kelasId)
        )
      )
  );
}
export async function deleteAbsensiGenerus(id: number[], kelasId: number) {
  return await tryCatch(
    "Failed to delete Absensi Generus",
    db
      .delete(absensiGenerusTable)
      .where(
        and(
          inArray(absensiGenerusTable.id, id),
          eq(absensiGenerusTable.kelasId, kelasId)
        )
      )
  );
}
