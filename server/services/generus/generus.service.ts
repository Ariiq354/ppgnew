import { and, count, eq, inArray, like, or, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { generusTable } from "~~/server/database/schema/generus";
import type { TGenerusCreate, TGenerusList, TWilayah } from "./dto/generus.dto";

export async function getAllGenerus(
  daerahId: number,
  {
    limit,
    page,
    search,
    kelasSekolah,
    kelasPengajian,
    desaId,
    kelompokId,
  }: TGenerusList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.daerahId, daerahId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(or(like(generusTable.nama, searchCondition)));
  }

  if (kelasSekolah) {
    conditions.push(eq(generusTable.kelasSekolah, kelasSekolah));
  }
  if (kelasPengajian) {
    conditions.push(eq(generusTable.kelasPengajian, kelasPengajian));
  }
  if (desaId) {
    conditions.push(eq(generusTable.desaId, desaId));
  }
  if (kelompokId) {
    conditions.push(eq(generusTable.kelompokId, kelompokId));
  }

  const query = db
    .select({
      id: generusTable.id,
      nama: generusTable.nama,
      tempatLahir: generusTable.tempatLahir,
      tanggalLahir: generusTable.tanggalLahir,
      kelasSekolah: generusTable.kelasSekolah,
      gender: generusTable.gender,
      noTelepon: generusTable.noTelepon,
      status: generusTable.status,
      kelasPengajian: generusTable.kelasPengajian,
      namaOrtu: generusTable.namaOrtu,
      noTeleponOrtu: generusTable.noTeleponOrtu,
      tanggalMasukKelas: generusTable.tanggalMasukKelas,
      foto: generusTable.foto,
    })
    .from(generusTable)
    .where(and(...conditions))
    .$dynamic();

  try {
    const total = await getTotalQuery(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Generus", error);
    throw InternalError;
  }
}

export async function getAllGenerusExport(kelompokId: number) {
  return await db
    .select({
      id: generusTable.id,
      nama: generusTable.nama,
      tempatLahir: generusTable.tempatLahir,
      tanggalLahir: generusTable.tanggalLahir,
      kelasSekolah: generusTable.kelasSekolah,
      gender: generusTable.gender,
      noTelepon: generusTable.noTelepon,
      status: generusTable.status,
      kelasPengajian: generusTable.kelasPengajian,
      namaOrtu: generusTable.namaOrtu,
      noTeleponOrtu: generusTable.noTeleponOrtu,
      foto: generusTable.foto,
    })
    .from(generusTable)
    .where(eq(generusTable.kelompokId, kelompokId));
}

export async function getAllGenerusChart(daerahId: number) {
  return await db
    .select({
      gender: generusTable.gender,
      kelasPengajian: generusTable.kelasPengajian,
    })
    .from(generusTable)
    .where(eq(generusTable.daerahId, daerahId));
}

export async function getCountGenerus(daerahId: number) {
  try {
    const [data] = await db
      .select({
        count: count(),
      })
      .from(generusTable)
      .where(eq(generusTable.daerahId, daerahId));
    return data?.count;
  } catch (error) {
    console.error("Failed to get Count Generus", error);
    throw InternalError;
  }
}

export async function getGenerusById(kelompokId: number, id: number) {
  try {
    return await db.query.generusTable.findFirst({
      where: and(
        eq(generusTable.kelompokId, kelompokId),
        eq(generusTable.id, id)
      ),
      columns: {
        id: true,
        foto: true,
      },
    });
  } catch (error) {
    console.error("Failed to get Generus By Id", error);
    throw InternalError;
  }
}

export async function createGenerus(wilayah: TWilayah, data: TGenerusCreate) {
  try {
    return await db.insert(generusTable).values({
      ...data,
      ...wilayah,
      tanggalMasukKelas: new Date(),
    });
  } catch (error) {
    console.error("Failed to create Generus", error);
    throw InternalError;
  }
}

export async function updateGenerus(
  id: number,
  kelompokId: number,
  data: TGenerusCreate
) {
  try {
    const user = await db.query.generusTable.findFirst({
      where: and(
        eq(generusTable.id, id),
        eq(generusTable.kelompokId, kelompokId)
      ),
    });

    const updateData: Partial<typeof generusTable.$inferInsert> = { ...data };

    if (user && user.kelasSekolah !== data.kelasSekolah) {
      updateData.tanggalMasukKelas = new Date();
    }

    return await db
      .update(generusTable)
      .set(updateData)
      .where(
        and(eq(generusTable.id, id), eq(generusTable.kelompokId, kelompokId))
      );
  } catch (error) {
    console.error("Failed to Update Generus", error);
    throw InternalError;
  }
}

export async function deleteGenerus(kelompokId: number, id: number[]) {
  try {
    return await db
      .delete(generusTable)
      .where(
        and(
          inArray(generusTable.id, id),
          eq(generusTable.kelompokId, kelompokId)
        )
      );
  } catch (error) {
    console.error("Failed to delete Generus", error);
    throw InternalError;
  }
}
