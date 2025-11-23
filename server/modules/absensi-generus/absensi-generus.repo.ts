import { and, count, eq, inArray, like, or, type SQL, sql } from "drizzle-orm";
import { db } from "~~/server/database";
import {
  absensiGenerusTable,
  generusTable,
  kelasTable,
} from "~~/server/database/schema/generus";
import { getGenerusByStatusSQL } from "~~/server/utils/common";
import { exclude, type kelasGenerusEnum } from "~~/shared/enum";

export async function getAbsensiGenerusByKelasId(
  kelompokId: number,
  kelasId: number,
  kelasPengajian: (typeof kelasGenerusEnum)[number]
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(absensiGenerusTable.kelasId, kelasId),
    eq(kelasTable.kelompokId, kelompokId),
    ...getGenerusByStatusSQL({ exclude: [...exclude] }),
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

export async function getCountAbsensiGenerusPerKelompok(params: {
  kelasPengajian: (typeof kelasGenerusEnum)[number];
  daerahId?: number;
  tahun?: number;
  bulan?: number;
  desaId?: number;
  kelompokId?: number;
}) {
  const { daerahId, desaId, kelompokId, kelasPengajian, bulan, tahun } = params;

  const conditions: (SQL<unknown> | undefined)[] = [
    ...getGenerusByStatusSQL({ exclude: [...exclude] }),
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

  if (daerahId) conditions.push(eq(generusTable.daerahId, daerahId));
  if (desaId) conditions.push(eq(generusTable.desaId, desaId));
  if (kelompokId) conditions.push(eq(generusTable.kelompokId, kelompokId));
  if (tahun)
    conditions.push(sql`EXTRACT(YEAR FROM ${kelasTable.tanggal}) = ${tahun}`);
  if (bulan)
    conditions.push(sql`EXTRACT(MONTH FROM ${kelasTable.tanggal}) = ${bulan}`);

  const data = await tryCatch(
    "Failed to get Count Absensi",
    db
      .select({
        kelompokId: kelasTable.kelompokId,
        count: count(),
      })
      .from(absensiGenerusTable)
      .innerJoin(kelasTable, eq(absensiGenerusTable.kelasId, kelasTable.id))
      .innerJoin(
        generusTable,
        eq(generusTable.id, absensiGenerusTable.generusId)
      )
      .where(and(...conditions))
      .groupBy(kelasTable.kelompokId)
  );

  return data;
}

export async function getAllGenerusSummary(
  params: {
    daerahId?: number;
    desaId?: number;
    kelompokId?: number;
  },
  { limit, page, search, kelasPengajian, tahun, bulan }: TGenerusAbsensiList
) {
  const { daerahId, desaId, kelompokId } = params;

  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    ...getGenerusByStatusSQL({ exclude: [...exclude] }),
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(or(like(generusTable.nama, searchCondition)));
  }

  if (kelompokId) conditions.push(eq(generusTable.kelompokId, kelompokId));
  if (desaId) conditions.push(eq(generusTable.desaId, desaId));
  if (daerahId) conditions.push(eq(generusTable.daerahId, daerahId));

  let dateFilterSql = sql`1=1`;
  if (tahun && bulan) {
    dateFilterSql = sql`
    EXTRACT(YEAR FROM ${kelasTable.tanggal}) = ${tahun}
    AND EXTRACT(MONTH FROM ${kelasTable.tanggal}) = ${bulan}
  `;
  } else if (tahun) {
    dateFilterSql = sql`
    EXTRACT(YEAR FROM ${kelasTable.tanggal}) = ${tahun}
  `;
  } else if (bulan) {
    dateFilterSql = sql`
    EXTRACT(MONTH FROM ${kelasTable.tanggal}) = ${bulan}
  `;
  }

  if (kelasPengajian) {
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
  }

  const query = db
    .select({
      id: generusTable.id,
      nama: generusTable.nama,
      kelompokId: generusTable.kelompokId,
      hadir: sql<number>`CAST(SUM(CASE WHEN ${absensiGenerusTable.keterangan} = 'Hadir' AND ${kelasTable.nama} = ${kelasPengajian} AND (${dateFilterSql}) THEN 1 ELSE 0 END) AS INT)`,
      izin: sql<number>`CAST(SUM(CASE WHEN ${absensiGenerusTable.keterangan} = 'Izin' AND ${kelasTable.nama} = ${kelasPengajian} AND (${dateFilterSql}) THEN 1 ELSE 0 END) AS INT)`,
    })
    .from(generusTable)
    .where(and(...conditions))
    .innerJoin(
      absensiGenerusTable,
      eq(generusTable.id, absensiGenerusTable.generusId)
    )
    .innerJoin(kelasTable, eq(absensiGenerusTable.kelasId, kelasTable.id))
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
