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
  absensiGenerusKeputrianTable,
  kelasKeputrianTable,
} from "~~/server/database/schema/keputrian";
import type {
  TAbsensiGenerusCreate,
  TGenerusAbsensiList,
} from "~~/server/utils/dto";
import { exclude } from "~~/shared/contants";

export async function getAllKeputrianExclude(
  daerahId: number,
  { limit, page, search, kelasPengajian }: TGenerusAbsensiList
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

  const total = await tryCatch(
    "Failed to get total count of Keputrian Absensi",
    db.$count(query)
  );
  const data = await tryCatch(
    "Failed to get list of Keputrian Absensi",
    query.limit(limit).offset(offset)
  );

  return {
    data,
    total,
  };
}

export async function getAbsensiKeputrianByKelasId(
  daerahId: number,
  kelasId: number,
  kelasPengajian: string
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(absensiGenerusKeputrianTable.kelasId, kelasId),
    eq(kelasKeputrianTable.daerahId, daerahId),
    sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`,
  ];

  if (kelasPengajian === "Usia Mandiri") {
    conditions.push(eq(generusTable.kelasPengajian, "Usia Mandiri"));
  } else {
    conditions.push(
      inArray(generusTable.kelasPengajian, ["Remaja", "Pranikah"])
    );
  }

  const data = await tryCatch(
    "Failed to get Absensi Keputrian",
    db
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
      .where(and(...conditions))
  );

  return data;
}

export async function getCountAbsensiKeputrian(
  daerahId: number,
  kelasPengajian: string
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasKeputrianTable.daerahId, daerahId),
    sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`,
    eq(kelasKeputrianTable.nama, kelasPengajian),
  ];

  if (kelasPengajian === "Usia Mandiri") {
    conditions.push(eq(generusTable.kelasPengajian, "Usia Mandiri"));
  } else {
    conditions.push(
      inArray(generusTable.kelasPengajian, ["Remaja", "Pranikah"])
    );
  }

  const [data] = await tryCatch(
    "Failed to get Count Absensi",
    db
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
      .where(and(...conditions))
  );

  return data!.count;
}

export async function getAbsensiKeputrianByDaerahId(daerahId: number) {
  return await tryCatch(
    "Failed to get Absensi Generus By Kelompok Id",
    db
      .select({
        id: absensiGenerusKeputrianTable.id,
        generusId: absensiGenerusKeputrianTable.generusId,
        kelasPengajian: generusTable.kelasPengajian,
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
          eq(kelasKeputrianTable.daerahId, daerahId),
          sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`,
          eq(generusTable.gender, "Perempuan"),
          inArray(generusTable.kelasPengajian, [
            "Remaja",
            "Pranikah",
            "Usia Mandiri",
          ])
        )
      )
  );
}

export async function getAllKeputrianSummary(
  daerahId: number,
  { limit, page, search, kelasPengajian }: TGenerusAbsensiList
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
      hadir: sql<number>`CAST(SUM(CASE WHEN ${absensiGenerusKeputrianTable.keterangan} = 'Hadir' AND ${kelasKeputrianTable.nama} = ${kelasPengajian} THEN 1 ELSE 0 END) AS INT)`,
      izin: sql<number>`CAST(SUM(CASE WHEN ${absensiGenerusKeputrianTable.keterangan} = 'Izin' AND ${kelasKeputrianTable.nama} = ${kelasPengajian} THEN 1 ELSE 0 END) AS INT)`,
    })
    .from(generusTable)
    .where(and(...conditions))
    .leftJoin(
      absensiGenerusKeputrianTable,
      eq(generusTable.id, absensiGenerusKeputrianTable.generusId)
    )
    .leftJoin(
      kelasKeputrianTable,
      eq(absensiGenerusKeputrianTable.kelasId, kelasKeputrianTable.id)
    )
    .groupBy(generusTable.id, generusTable.nama);

  const total = await tryCatch(
    "Failed to get total count of Keputrian Summary",
    db.$count(query)
  );
  const data = await tryCatch(
    "Failed to get list of Keputrian Summary",
    query.limit(limit).offset(offset)
  );

  return {
    data,
    total,
  };
}

export async function getCountKeputrianAbsensi(
  daerahId: number,
  kelasPengajian: string
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.daerahId, daerahId),
    eq(generusTable.gender, "Perempuan"),
    sql`NOT (${generusTable.status} ?| ${new Param(exclude)})`,
  ];

  if (kelasPengajian === "Usia Mandiri") {
    conditions.push(eq(generusTable.kelasPengajian, "Usia Mandiri"));
  } else {
    conditions.push(
      inArray(generusTable.kelasPengajian, ["Remaja", "Pranikah"])
    );
  }

  return await tryCatch(
    "Failed to get Count Generus",
    db.$count(generusTable, and(...conditions))
  );
}

export async function createAbsensiKeputrian(
  kelasId: number,
  daerahId: number,
  namaKelas: string,
  data: TAbsensiGenerusCreate
) {
  const generus = await tryCatch(
    "Failed to find Generus for Absensi creation",
    db.query.generusTable.findFirst({
      where: eq(generusTable.id, data.generusId),
    })
  );

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

  return await tryCatch(
    "Failed to create Absensi Generus Keputrian",
    db.insert(absensiGenerusKeputrianTable).values({
      ...data,
      kelasId,
    })
  );
}

export async function updateAbsensiKeputrian(
  id: number,
  kelasId: number,
  daerahId: number,
  namaKelas: string,
  data: TAbsensiGenerusCreate
) {
  const generus = await tryCatch(
    "Failed to find Generus for Absensi update",
    db.query.generusTable.findFirst({
      where: eq(generusTable.id, data.generusId),
    })
  );

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

  return await tryCatch(
    "Failed to Update Absensi Keputrian",
    db
      .update(absensiGenerusKeputrianTable)
      .set(data)
      .where(
        and(
          eq(absensiGenerusKeputrianTable.id, id),
          eq(absensiGenerusKeputrianTable.kelasId, kelasId)
        )
      )
  );
}
export async function deleteAbsensiKeputrian(id: number[], kelasId: number) {
  return await tryCatch(
    "Failed to delete Absensi Keputrian",
    db
      .delete(absensiGenerusKeputrianTable)
      .where(
        and(
          inArray(absensiGenerusKeputrianTable.id, id),
          eq(absensiGenerusKeputrianTable.kelasId, kelasId)
        )
      )
  );
}
