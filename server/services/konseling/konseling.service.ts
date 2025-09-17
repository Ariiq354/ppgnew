import { and, eq, inArray, like, or, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { generusTable } from "~~/server/database/schema/generus";
import { generusKonselingTable } from "~~/server/database/schema/kelompok";
import type {
  TKonselingCreate,
  TKonselingList,
  TKonselingUpdate,
} from "./dto/konseling.dto";

export async function getAllKonseling(
  kelompokId: number,
  { limit, page, search }: TKonselingList
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

  try {
    const total = await db.$count(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Konseling", error);
    throw InternalError;
  }
}

export async function getAllKonselingDaerah(
  daerahId: number,
  { limit, page, search }: TKonselingList
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

  try {
    const total = await db.$count(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Konseling Daerah", error);
    throw InternalError;
  }
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

  return await db
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
    .where(and(...conditions));
}

export async function createKonseling(
  daerahId: number,
  kelompokId: number,
  data: TKonselingCreate
) {
  try {
    const generus = await db.query.generusTable.findFirst({
      where: and(
        eq(generusTable.daerahId, daerahId),
        eq(generusTable.kelompokId, kelompokId)
      ),
    });

    if (!generus) {
      throw createError({
        status: 403,
        message: "Generus tidak ada di kelompok ini",
      });
    }

    return await db.insert(generusKonselingTable).values({
      ...data,
      daerahId,
      status: "Baru",
    });
  } catch (error) {
    console.error("Failed to create Konseling", error);
    throw InternalError;
  }
}

export async function updateKonseling(
  id: number,
  daerahId: number,
  kelompokId: number,
  data: TKonselingCreate
) {
  try {
    const generus = await db.query.generusTable.findFirst({
      where: and(
        eq(generusTable.daerahId, daerahId),
        eq(generusTable.kelompokId, kelompokId)
      ),
    });

    if (!generus) {
      throw createError({
        status: 403,
        message: "Generus tidak ada di kelompok ini",
      });
    }

    return await db
      .update(generusKonselingTable)
      .set(data)
      .where(
        and(
          eq(generusKonselingTable.id, id),
          eq(generusKonselingTable.daerahId, daerahId)
        )
      );
  } catch (error) {
    console.error("Failed to Update Konseling", error);
    throw InternalError;
  }
}

export async function updateKonselingDaerah(
  id: number,
  daerahId: number,
  data: TKonselingUpdate
) {
  try {
    return await db
      .update(generusKonselingTable)
      .set(data)
      .where(
        and(
          eq(generusKonselingTable.id, id),
          eq(generusKonselingTable.daerahId, daerahId)
        )
      );
  } catch (error) {
    console.error("Failed to Update Konseling Daerah", error);
    throw InternalError;
  }
}

export async function deleteKonseling(
  daerahId: number,
  kelompokId: number,
  id: number[]
) {
  try {
    const generus = await db.query.generusTable.findFirst({
      where: and(
        eq(generusTable.daerahId, daerahId),
        eq(generusTable.kelompokId, kelompokId)
      ),
    });

    if (!generus) {
      throw createError({
        status: 403,
        message: "Generus tidak ada di kelompok ini",
      });
    }

    return await db
      .delete(generusKonselingTable)
      .where(
        and(
          inArray(generusKonselingTable.id, id),
          eq(generusKonselingTable.daerahId, daerahId)
        )
      );
  } catch (error) {
    console.error("Failed to delete Konseling", error);
    throw InternalError;
  }
}
