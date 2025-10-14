import { and, eq, inArray, like, or, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { generusTable } from "~~/server/database/schema/generus";
import { generusKonselingTable } from "~~/server/database/schema/kelompok";
import type { TSearchPagination } from "~~/server/utils/dto";
import type { TKonselingCreate, TKonselingUpdate } from "./konseling.dto";

export async function getAllKonseling(
  kelompokId: number,
  { limit, page, search }: TSearchPagination
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.kelompokId, kelompokId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(or(like(generusTable.nama, searchCondition)));
  }

  const query = db
    .select({
      id: generusKonselingTable.id,
      generusId: generusKonselingTable.generusId,
      nama: generusTable.nama,
      keterangan: generusKonselingTable.keterangan,
      status: generusKonselingTable.status,
    })
    .from(generusKonselingTable)
    .leftJoin(
      generusTable,
      eq(generusKonselingTable.generusId, generusTable.id)
    )
    .where(and(...conditions));

  const total = await tryCatch(
    "Failed to get total count of Konseling",
    db.$count(query)
  );
  const data = await tryCatch(
    "Failed to get list of Konseling",
    query.limit(limit).offset(offset)
  );

  return {
    data,
    total,
  };
}

export async function getAllKonselingDaerah(
  daerahId: number,
  { limit, page, search }: TSearchPagination
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusKonselingTable.daerahId, daerahId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(or(like(generusTable.nama, searchCondition)));
  }

  const query = db
    .select({
      id: generusKonselingTable.id,
      generusId: generusKonselingTable.generusId,
      nama: generusTable.nama,
      gender: generusTable.gender,
      tempatLahir: generusTable.tempatLahir,
      tanggalLahir: generusTable.tanggalLahir,
      noTelepon: generusTable.noTelepon,
      namaOrtu: generusTable.namaOrtu,
      noTeleponOrtu: generusTable.noTeleponOrtu,
      kelasSekolah: generusTable.kelasSekolah,
      tanggalMasukKelas: generusTable.tanggalMasukKelas,
      kelasPengajian: generusTable.kelasPengajian,
      keterangan: generusKonselingTable.keterangan,
      status: generusKonselingTable.status,
    })
    .from(generusKonselingTable)
    .leftJoin(
      generusTable,
      eq(generusKonselingTable.generusId, generusTable.id)
    )
    .where(and(...conditions));

  const total = await tryCatch(
    "Failed to get total count of Konseling Daerah",
    db.$count(query)
  );
  const data = await tryCatch(
    "Failed to get list of Konseling Daerah",
    query.limit(limit).offset(offset)
  );

  return {
    data,
    total,
  };
}

export async function getAllKonselingExport(
  daerahId: number,
  kelompokId?: number
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusKonselingTable.daerahId, daerahId),
  ];

  if (kelompokId) {
    conditions.push(eq(generusTable.kelompokId, kelompokId));
  }

  return await tryCatch(
    "Failed to export Konseling data",
    db
      .select({
        nama: generusTable.nama,
        keterangan: generusKonselingTable.keterangan,
        status: generusKonselingTable.status,
      })
      .from(generusKonselingTable)
      .leftJoin(
        generusTable,
        eq(generusKonselingTable.generusId, generusTable.id)
      )
      .where(and(...conditions))
  );
}

export async function createKonseling(
  daerahId: number,
  kelompokId: number,
  data: TKonselingCreate
) {
  const generus = await tryCatch(
    "Failed to find Generus for Konseling creation",
    db.query.generusTable.findFirst({
      where: and(
        eq(generusTable.daerahId, daerahId),
        eq(generusTable.kelompokId, kelompokId)
      ),
    })
  );

  if (!generus) {
    throw createError({
      status: 403,
      message: "Generus tidak ada di kelompok ini",
    });
  }

  return await tryCatch(
    "Failed to create Konseling",
    db.insert(generusKonselingTable).values({
      ...data,
      daerahId,
      status: "Baru",
    })
  );
}

export async function updateKonseling(
  id: number,
  daerahId: number,
  kelompokId: number,
  data: TKonselingCreate
) {
  const generus = await tryCatch(
    "Failed to find Generus for Konseling update",
    db.query.generusTable.findFirst({
      where: and(
        eq(generusTable.daerahId, daerahId),
        eq(generusTable.kelompokId, kelompokId)
      ),
    })
  );

  if (!generus) {
    throw createError({
      status: 403,
      message: "Generus tidak ada di kelompok ini",
    });
  }

  return await tryCatch(
    "Failed to Update Konseling",
    db
      .update(generusKonselingTable)
      .set(data)
      .where(
        and(
          eq(generusKonselingTable.id, id),
          eq(generusKonselingTable.daerahId, daerahId)
        )
      )
  );
}

export async function updateKonselingDaerah(
  id: number,
  daerahId: number,
  data: TKonselingUpdate
) {
  return await tryCatch(
    "Failed to Update Konseling Daerah",
    db
      .update(generusKonselingTable)
      .set(data)
      .where(
        and(
          eq(generusKonselingTable.id, id),
          eq(generusKonselingTable.daerahId, daerahId)
        )
      )
  );
}

export async function deleteKonseling(
  daerahId: number,
  kelompokId: number,
  id: number[]
) {
  const generus = await tryCatch(
    "Failed to find Generus for Konseling deletion",
    db.query.generusTable.findFirst({
      where: and(
        eq(generusTable.daerahId, daerahId),
        eq(generusTable.kelompokId, kelompokId)
      ),
    })
  );

  if (!generus) {
    throw createError({
      status: 403,
      message: "Generus tidak ada di kelompok ini",
    });
  }

  return await tryCatch(
    "Failed to delete Konseling",
    db
      .delete(generusKonselingTable)
      .where(
        and(
          inArray(generusKonselingTable.id, id),
          eq(generusKonselingTable.daerahId, daerahId)
        )
      )
  );
}
