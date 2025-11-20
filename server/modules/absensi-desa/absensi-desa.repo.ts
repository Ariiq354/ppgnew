import { and, count, eq, inArray, like, or, type SQL, sql } from "drizzle-orm";
import { db } from "~~/server/database";
import {
  absensiGenerusDesaTable,
  kelasDesaTable,
} from "~~/server/database/schema/desa";
import { generusTable } from "~~/server/database/schema/generus";
import type { TAbsensiGenerusCreate } from "~~/server/utils/dto/absensi.dto";
import { exclude, type kelasGenerusEnum } from "~~/shared/enum";
import type { TGenerusDesaAbsensiList } from "./absensi-desa.dto";

export async function getAbsensiGenerusDesaByKelasId(
  desaId: number,
  kelasId: number,
  kelasPengajian: (typeof kelasGenerusEnum)[number]
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(absensiGenerusDesaTable.kelasId, kelasId),
    eq(kelasDesaTable.desaId, desaId),
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
      .where(and(...conditions))
  );

  return data;
}

export async function getAbsensiGenerusByDesaId(desaId: number) {
  return await tryCatch(
    "Failed to get Absensi Generus Desa By Desa Id",
    db
      .select({
        id: absensiGenerusDesaTable.id,
        generusId: absensiGenerusDesaTable.generusId,
        kelasPengajian: kelasDesaTable.nama,
        kelasPengajianGenerus: generusTable.kelasPengajian,
        detail: absensiGenerusDesaTable.detail,
        keterangan: absensiGenerusDesaTable.keterangan,
      })
      .from(absensiGenerusDesaTable)
      .innerJoin(
        kelasDesaTable,
        eq(absensiGenerusDesaTable.kelasId, kelasDesaTable.id)
      )
      .innerJoin(
        generusTable,
        eq(generusTable.id, absensiGenerusDesaTable.generusId)
      )
      .where(
        and(
          eq(kelasDesaTable.desaId, desaId),
          ...getGenerusByStatusSQL({ exclude: [...exclude] })
        )
      )
  );
}

export async function getCountAbsensiGenerusDesa(
  params: {
    desaId?: number;
    daerahId?: number;
  },
  kelasPengajian: (typeof kelasGenerusEnum)[number]
) {
  const { daerahId, desaId } = params;

  const conditions: (SQL<unknown> | undefined)[] = [
    ...getGenerusByStatusSQL({ exclude: [...exclude] }),
    eq(kelasDesaTable.nama, kelasPengajian),
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
      .where(and(...conditions))
  );

  return data!.count;
}

export async function getAllGenerusDesaSummary(
  {
    daerahId,
    desaId,
  }: {
    daerahId?: number;
    desaId?: number;
  },
  { limit, page, search, kelasPengajian, kelompokId }: TGenerusDesaAbsensiList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    ...getGenerusByStatusSQL({ exclude: [...exclude] }),
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(or(like(generusTable.nama, searchCondition)));
  }

  if (daerahId) conditions.push(eq(generusTable.daerahId, daerahId));
  if (desaId) conditions.push(eq(generusTable.desaId, desaId));
  if (kelompokId) conditions.push(eq(generusTable.kelompokId, kelompokId));

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
      hadir: sql<number>`CAST(SUM(CASE WHEN ${absensiGenerusDesaTable.keterangan} = 'Hadir' AND ${kelasDesaTable.nama} = ${kelasPengajian} THEN 1 ELSE 0 END) AS INT)`,
      izin: sql<number>`CAST(SUM(CASE WHEN ${absensiGenerusDesaTable.keterangan} = 'Izin' AND ${kelasDesaTable.nama} = ${kelasPengajian} THEN 1 ELSE 0 END) AS INT)`,
    })
    .from(generusTable)
    .where(and(...conditions))
    .leftJoin(
      absensiGenerusDesaTable,
      eq(generusTable.id, absensiGenerusDesaTable.generusId)
    )
    .leftJoin(
      kelasDesaTable,
      eq(absensiGenerusDesaTable.kelasId, kelasDesaTable.id)
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
