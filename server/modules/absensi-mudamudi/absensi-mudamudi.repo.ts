import {
  and,
  count,
  desc,
  eq,
  ilike,
  inArray,
  or,
  type SQL,
  sql,
} from "drizzle-orm";
import { db } from "~~/server/database";
import { generusTable } from "~~/server/database/schema/generus";
import {
  absensiGenerusMudaMudiTable,
  kelasMudaMudiTable,
} from "~~/server/database/schema/mudamudi";
import { getGenerusByStatusSQL } from "~~/server/utils/common";
import type { TMudamudiAbsensiList } from "~~/server/utils/dto/absensi.dto";
import { exclude, type kelasMudamudiEnum } from "~~/shared/enum";

export async function getAbsensiMudamudiByKelasId(
  daerahId: number,
  kelasId: number,
  kelasPengajian: string
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(absensiGenerusMudaMudiTable.kelasId, kelasId),
    eq(kelasMudaMudiTable.daerahId, daerahId),
    ...getGenerusByStatusSQL({ exclude: [...exclude] }),
  ];

  if (kelasPengajian === "Usia Mandiri") {
    conditions.push(eq(generusTable.kelasPengajian, "Usia Mandiri"));
  } else {
    conditions.push(
      inArray(generusTable.kelasPengajian, ["Remaja", "Pranikah"])
    );
  }

  const data = await tryCatch(
    "Failed to get Absensi Mudamudi",
    db
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
      .where(and(...conditions))
  );

  return data;
}

export async function getAbsensiMudamudiByDaerahId(daerahId: number) {
  return await tryCatch(
    "Failed to get Absensi Generus By Kelompok Id",
    db
      .select({
        id: absensiGenerusMudaMudiTable.id,
        kelasPengajian: kelasMudaMudiTable.nama,
        kelasPengajianGenerus: generusTable.kelasPengajian,
      })
      .from(absensiGenerusMudaMudiTable)
      .innerJoin(
        kelasMudaMudiTable,
        eq(absensiGenerusMudaMudiTable.kelasId, kelasMudaMudiTable.id)
      )
      .innerJoin(
        generusTable,
        eq(generusTable.id, absensiGenerusMudaMudiTable.generusId)
      )
      .where(
        and(
          eq(kelasMudaMudiTable.daerahId, daerahId),
          ...getGenerusByStatusSQL({ exclude: [...exclude] }),
          inArray(generusTable.kelasPengajian, [
            "Remaja",
            "Pranikah",
            "Usia Mandiri",
          ])
        )
      )
  );
}

export async function getCountAbsensiMudamudi(
  daerahId: number,
  kelasPengajian: (typeof kelasMudamudiEnum)[number]
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(kelasMudaMudiTable.daerahId, daerahId),
    ...getGenerusByStatusSQL({ exclude: [...exclude] }),
    eq(kelasMudaMudiTable.nama, kelasPengajian),
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
      .from(absensiGenerusMudaMudiTable)
      .leftJoin(
        kelasMudaMudiTable,
        eq(absensiGenerusMudaMudiTable.kelasId, kelasMudaMudiTable.id)
      )
      .leftJoin(
        generusTable,
        eq(generusTable.id, absensiGenerusMudaMudiTable.generusId)
      )
      .where(and(...conditions))
  );

  return data!.count;
}

export async function getAllMudamudiSummary(
  daerahId: number,
  { limit, page, search, kelasPengajian }: TMudamudiAbsensiList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.daerahId, daerahId),
    ...getGenerusByStatusSQL({ exclude: [...exclude] }),
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(or(ilike(generusTable.nama, searchCondition)));
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
    .groupBy(generusTable.id, generusTable.nama)
    .orderBy(desc(generusTable.id));

  const total = await tryCatch(
    "Failed to get total count of Mudamudi Summary",
    db.$count(query)
  );
  const data = await tryCatch(
    "Failed to get list of Mudamudi Summary",
    query.limit(limit).offset(offset)
  );

  return {
    data,
    total,
  };
}

export async function createAbsensiMudamudi(
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
    "Failed to create Absensi Generus Mudamudi",
    db.insert(absensiGenerusMudaMudiTable).values({
      ...data,
      kelasId,
    })
  );
}

export async function updateAbsensiMudamudi(
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
    "Failed to Update Absensi Mudamudi",
    db
      .update(absensiGenerusMudaMudiTable)
      .set(data)
      .where(
        and(
          eq(absensiGenerusMudaMudiTable.id, id),
          eq(absensiGenerusMudaMudiTable.kelasId, kelasId)
        )
      )
  );
}

export async function deleteAbsensiMudamudi(id: number[], kelasId: number) {
  return await tryCatch(
    "Failed to delete Absensi Mudamudi",
    db
      .delete(absensiGenerusMudaMudiTable)
      .where(
        and(
          inArray(absensiGenerusMudaMudiTable.id, id),
          eq(absensiGenerusMudaMudiTable.kelasId, kelasId)
        )
      )
  );
}
