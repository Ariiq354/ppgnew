import { and, eq, inArray, like, or, sql, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import {
  generusStatusTable,
  generusTable,
} from "~~/server/database/schema/generus";
import { kelompokTable } from "~~/server/database/schema/wilayah";
import { getGenerusByStatusSQL } from "~~/server/utils/common";
import type { TWilayah } from "~~/server/utils/dto/common.dto";
import type { TGenerusGenericList } from "~~/server/utils/dto/generus.dto";
import { exclude, type kelasGenerusEnum } from "~~/shared/enum";
import type { TGenerusCreate } from "./generus.dto";

export async function getAllGenerus(
  {
    daerahId,
    desaId,
    kelompokId,
  }: {
    daerahId?: number;
    kelompokId?: number;
    desaId?: number;
  },
  { limit, page, search, kelasPengajian }: TGenerusGenericList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(or(like(generusTable.nama, searchCondition)));
  }

  if (kelasPengajian) {
    conditions.push(eq(generusTable.kelasPengajian, kelasPengajian));
  }

  if (daerahId) conditions.push(eq(generusTable.daerahId, daerahId));
  if (desaId) conditions.push(eq(generusTable.desaId, desaId));
  if (kelompokId) conditions.push(eq(generusTable.kelompokId, kelompokId));

  const query = db
    .select({
      id: generusTable.id,
      nama: generusTable.nama,
      tempatLahir: generusTable.tempatLahir,
      tanggalLahir: generusTable.tanggalLahir,
      kelasSekolah: generusTable.kelasSekolah,
      gender: generusTable.gender,
      noTelepon: generusTable.noTelepon,
      kelasPengajian: generusTable.kelasPengajian,
      namaOrtu: generusTable.namaOrtu,
      status: sql<
        string[]
      >`COALESCE(ARRAY_AGG(${generusStatusTable.status}), '{}')`,
      noTeleponOrtu: generusTable.noTeleponOrtu,
      tanggalMasukKelas: generusTable.tanggalMasukKelas,
      foto: generusTable.foto,
      namaKelompok: kelompokTable.name,
    })
    .from(generusTable)
    .where(and(...conditions))
    .innerJoin(kelompokTable, eq(generusTable.kelompokId, kelompokTable.id))
    .leftJoin(
      generusStatusTable,
      eq(generusTable.id, generusStatusTable.generusId)
    );

  const total = await tryCatch(
    "Failed to get total count of Generus",
    db.$count(query)
  );
  const data = await tryCatch(
    "Failed to get list of Generus",
    query.limit(limit).offset(offset)
  );

  return { data, total };
}

export async function getAllGenerusExclude(
  {
    daerahId,
    desaId,
    kelompokId,
  }: {
    daerahId?: number;
    kelompokId?: number;
    desaId?: number;
  },
  { limit, page, search, kelasPengajian }: TGenerusAbsensiList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    ...getGenerusByStatusSQL({ exclude: [...exclude] }),
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

  if (daerahId) conditions.push(eq(generusTable.daerahId, daerahId));
  if (desaId) conditions.push(eq(generusTable.desaId, desaId));
  if (kelompokId) conditions.push(eq(generusTable.kelompokId, kelompokId));

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

export async function getAllGenerusExport({
  daerahId,
  desaId,
  kelompokId,
}: {
  daerahId?: number;
  kelompokId?: number;
  desaId?: number;
}) {
  const conditions: (SQL<unknown> | undefined)[] = [];

  if (daerahId) conditions.push(eq(generusTable.daerahId, daerahId));
  if (desaId) conditions.push(eq(generusTable.desaId, desaId));
  if (kelompokId) conditions.push(eq(generusTable.kelompokId, kelompokId));

  return await tryCatch(
    "Failed to export Generus data",
    db
      .select({
        id: generusTable.id,
        nama: generusTable.nama,
        tempatLahir: generusTable.tempatLahir,
        tanggalLahir: generusTable.tanggalLahir,
        kelasSekolah: generusTable.kelasSekolah,
        gender: generusTable.gender,
        noTelepon: generusTable.noTelepon,
        kelasPengajian: generusTable.kelasPengajian,
        namaOrtu: generusTable.namaOrtu,
        noTeleponOrtu: generusTable.noTeleponOrtu,
        tanggalMasukKelas: generusTable.tanggalMasukKelas,
        foto: generusTable.foto,
        namaKelompok: kelompokTable.name,
      })
      .from(generusTable)
      .leftJoin(kelompokTable, eq(generusTable.kelompokId, kelompokTable.id))
      .where(and())
  );
}

export async function getAllGenerus69(daerahId: number) {
  return await tryCatch(
    "Failed to get Generus 69 data",
    db
      .select({
        kelasSekolah: generusTable.kelasSekolah,
        tanggalMasukKelas: generusTable.tanggalMasukKelas,
        kelompokId: generusTable.kelompokId,
        desaId: generusTable.desaId,
        gender: generusTable.gender,
      })
      .from(generusTable)
      .where(eq(generusTable.daerahId, daerahId))
  );
}

export async function getGenerusOptionsKelompok(kelompokId: number) {
  return await tryCatch(
    "Failed to get Generus options for Kelompok",
    db
      .select({
        id: generusTable.id,
        nama: generusTable.nama,
        tempatLahir: generusTable.tempatLahir,
        tanggalLahir: generusTable.tanggalLahir,
        kelasSekolah: generusTable.kelasSekolah,
        gender: generusTable.gender,
        noTelepon: generusTable.noTelepon,
        kelasPengajian: generusTable.kelasPengajian,
        namaOrtu: generusTable.namaOrtu,
        noTeleponOrtu: generusTable.noTeleponOrtu,
        tanggalMasukKelas: generusTable.tanggalMasukKelas,
        foto: generusTable.foto,
      })
      .from(generusTable)
      .where(eq(generusTable.kelompokId, kelompokId))
  );
}

export async function getAllGenerusChart(params: {
  kelompokId?: number;
  desaId?: number;
  daerahId?: number;
}) {
  const { daerahId, desaId, kelompokId } = params;

  const conditions: (SQL<unknown> | undefined)[] = [];

  if (daerahId) conditions.push(eq(generusTable.daerahId, daerahId));
  if (desaId) conditions.push(eq(generusTable.desaId, desaId));
  if (kelompokId) conditions.push(eq(generusTable.kelompokId, kelompokId));

  return await tryCatch(
    "Failed to get Generus chart data",
    db
      .select({
        gender: generusTable.gender,
        kelasPengajian: generusTable.kelasPengajian,
      })
      .from(generusTable)
      .where(and(...conditions))
  );
}

export async function getGenerusById(kelompokId: number, id: number) {
  return await tryCatch(
    "Failed to get Generus by ID",
    db.query.generusTable.findFirst({
      where: and(
        eq(generusTable.kelompokId, kelompokId),
        eq(generusTable.id, id)
      ),
      columns: {
        id: true,
        foto: true,
      },
    })
  );
}

export async function getGenerusKelasPengajianExclude(params: {
  kelompokId?: number;
  desaId?: number;
  daerahId?: number;
}) {
  const { daerahId, desaId, kelompokId } = params;

  const conditions: (SQL<unknown> | undefined)[] = [
    ...getGenerusByStatusSQL({ include: ["GPS"], exclude: [...exclude] }),
  ];

  if (daerahId) conditions.push(eq(generusTable.daerahId, daerahId));
  if (desaId) conditions.push(eq(generusTable.desaId, desaId));
  if (kelompokId) conditions.push(eq(generusTable.kelompokId, kelompokId));

  return await tryCatch(
    "Failed to get Generus Absensi Exclude",
    db
      .select({
        id: generusTable.id,
        kelasPengajian: generusTable.kelasPengajian,
      })
      .from(generusTable)
      .where(and(...conditions))
  );
}

export async function getCountGenerusExclude(
  params: {
    kelompokId?: number;
    desaId?: number;
    daerahId?: number;
  },
  kelasPengajian: (typeof kelasGenerusEnum)[number]
) {
  const { daerahId, desaId, kelompokId } = params;

  const conditions: (SQL<unknown> | undefined)[] = [
    ...getGenerusByStatusSQL({ include: ["GPS"], exclude: [...exclude] }),
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

  return await tryCatch(
    "Failed to get Count Generus",
    db.$count(generusTable, and(...conditions))
  );
}

export async function createGenerus(wilayah: TWilayah, data: TGenerusCreate) {
  return await tryCatch(
    "Failed to create Generus",
    db.insert(generusTable).values({
      ...data,
      ...wilayah,
      tanggalMasukKelas: new Date(),
    })
  );
}

export async function updateGenerus(
  id: number,
  kelompokId: number,
  data: TGenerusCreate
) {
  const user = await tryCatch(
    "Failed to find Generus for update",
    db.query.generusTable.findFirst({
      where: and(
        eq(generusTable.id, id),
        eq(generusTable.kelompokId, kelompokId)
      ),
    })
  );

  const updateData: Partial<typeof generusTable.$inferInsert> = { ...data };

  if (user && user.kelasSekolah !== data.kelasSekolah) {
    updateData.tanggalMasukKelas = new Date();
  }

  return await tryCatch(
    "Failed to update Generus",
    db
      .update(generusTable)
      .set(updateData)
      .where(
        and(eq(generusTable.id, id), eq(generusTable.kelompokId, kelompokId))
      )
  );
}

export async function deleteGenerus(kelompokId: number, id: number[]) {
  return await tryCatch(
    "Failed to delete Generus",
    db
      .delete(generusTable)
      .where(
        and(
          inArray(generusTable.id, id),
          eq(generusTable.kelompokId, kelompokId)
        )
      )
  );
}
