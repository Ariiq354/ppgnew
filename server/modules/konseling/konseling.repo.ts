import { and, eq, inArray, like, or, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { generusTable } from "~~/server/database/schema/generus";
import { generusKonselingTable } from "~~/server/database/schema/kelompok";
import type { TSearchPagination } from "~~/server/utils/dto/common.dto";
import type { TKonselingCreate, TKonselingUpdate } from "./konseling.dto";
import { desaTable, kelompokTable } from "~~/server/database/schema/wilayah";

export async function getAllKonseling(
  params: { kelompokId?: number; daerahId?: number; desaId?: number },
  { limit, page, search }: TSearchPagination
) {
  const { daerahId, desaId, kelompokId } = params;

  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [];

  if (search) {
    const searchCondition = `%${search}%`;

    conditions.push(or(like(generusTable.nama, searchCondition)));
  }

  if (daerahId) conditions.push(eq(desaTable.daerahId, daerahId));
  if (desaId) conditions.push(eq(kelompokTable.desaId, desaId));
  if (kelompokId) conditions.push(eq(generusTable.kelompokId, kelompokId));

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
    .innerJoin(
      generusTable,
      eq(generusKonselingTable.generusId, generusTable.id)
    )
    .innerJoin(kelompokTable, eq(generusTable.kelompokId, kelompokTable.id))
    .innerJoin(desaTable, eq(kelompokTable.desaId, desaTable.id))
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

export async function getAllKonselingExport(kelompokId: number) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusKonselingTable.kelompokId, kelompokId),
  ];

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

export async function getKonselingByDaerahId(id: number, daerahId: number) {
  return await tryCatch(
    "Failed to get Konseling by daerah id",
    db
      .select({
        id: generusKonselingTable.id,
      })
      .from(generusKonselingTable)
      .leftJoin(
        kelompokTable,
        eq(kelompokTable.id, generusKonselingTable.kelompokId)
      )
      .leftJoin(desaTable, eq(kelompokTable.desaId, desaTable.id))
      .where(
        and(eq(generusKonselingTable.id, id), eq(desaTable.daerahId, daerahId))
      )
  );
}

export async function createKonseling(
  kelompokId: number,
  data: TKonselingCreate
) {
  return await tryCatch(
    "Failed to create Konseling",
    db.insert(generusKonselingTable).values({
      ...data,
      kelompokId,
      status: "Baru",
    })
  );
}

export async function updateKonseling(
  id: number,
  kelompokId: number,
  data: TKonselingCreate
) {
  return await tryCatch(
    "Failed to Update Konseling",
    db
      .update(generusKonselingTable)
      .set(data)
      .where(
        and(
          eq(generusKonselingTable.id, id),
          eq(generusKonselingTable.kelompokId, kelompokId)
        )
      )
  );
}

export async function updateKonselingDaerah(
  id: number,
  data: TKonselingUpdate
) {
  return await tryCatch(
    "Failed to Update Konseling Daerah",
    db
      .update(generusKonselingTable)
      .set(data)
      .where(and(eq(generusKonselingTable.id, id)))
  );
}

export async function deleteKonseling(kelompokId: number, id: number[]) {
  return await tryCatch(
    "Failed to delete Konseling",
    db
      .delete(generusKonselingTable)
      .where(
        and(
          inArray(generusKonselingTable.id, id),
          eq(generusKonselingTable.kelompokId, kelompokId)
        )
      )
  );
}
