import { and, eq, inArray, like, or, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { pengajarTable } from "~~/server/database/schema/pengajar";
import type { TWilayah } from "~~/server/utils/dto";
import type { TPengajarCreate, TPengajarList } from "./pengajar.dto";
import { kelompokTable } from "~~/server/database/schema/wilayah";

export async function getAllPengajar(
  daerahId: number,
  { limit, page, search, status, desaId, kelompokId }: TPengajarList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(pengajarTable.daerahId, daerahId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(
      or(
        like(pengajarTable.nama, searchCondition),
        like(pengajarTable.pendidikan, searchCondition)
      )
    );
  }

  if (status) {
    conditions.push(eq(pengajarTable.status, status));
  }

  if (desaId) {
    conditions.push(eq(pengajarTable.desaId, desaId));
  }
  if (kelompokId) {
    conditions.push(eq(pengajarTable.kelompokId, kelompokId));
  }

  const query = db
    .select({
      id: pengajarTable.id,
      nama: pengajarTable.nama,
      tempatLahir: pengajarTable.tempatLahir,
      tanggalLahir: pengajarTable.tanggalLahir,
      pendidikan: pengajarTable.pendidikan,
      gender: pengajarTable.gender,
      noTelepon: pengajarTable.noTelepon,
      status: pengajarTable.status,
      tanggalTugas: pengajarTable.tanggalTugas,
      foto: pengajarTable.foto,
      namaKelompok: kelompokTable.name,
    })
    .from(pengajarTable)
    .where(and(...conditions))
    .leftJoin(kelompokTable, eq(kelompokTable.id, pengajarTable.kelompokId));

  try {
    const total = await db.$count(query);
    const data = await query.limit(limit).offset(offset);

    return {
      data,
      total,
    };
  } catch (error) {
    console.error("Failed to get List Pengajar", error);
    throw InternalError;
  }
}

export async function getAllPengajarExport(kelompokId: number) {
  return await db
    .select({
      id: pengajarTable.id,
      nama: pengajarTable.nama,
      tempatLahir: pengajarTable.tempatLahir,
      tanggalLahir: pengajarTable.tanggalLahir,
      pendidikan: pengajarTable.pendidikan,
      gender: pengajarTable.gender,
      noTelepon: pengajarTable.noTelepon,
      status: pengajarTable.status,
      tanggalTugas: pengajarTable.tanggalTugas,
      foto: pengajarTable.foto,
    })
    .from(pengajarTable)
    .where(eq(pengajarTable.kelompokId, kelompokId));
}

export async function getAllPengajarExportDesa(desaId: number) {
  return await db
    .select({
      id: pengajarTable.id,
      nama: pengajarTable.nama,
      tempatLahir: pengajarTable.tempatLahir,
      tanggalLahir: pengajarTable.tanggalLahir,
      pendidikan: pengajarTable.pendidikan,
      gender: pengajarTable.gender,
      noTelepon: pengajarTable.noTelepon,
      status: pengajarTable.status,
      tanggalTugas: pengajarTable.tanggalTugas,
      foto: pengajarTable.foto,
      namaKelompok: kelompokTable.name,
    })
    .from(pengajarTable)
    .where(eq(pengajarTable.desaId, desaId))
    .leftJoin(kelompokTable, eq(kelompokTable.id, pengajarTable.kelompokId));
}

export async function getCountPengajar(
  daerahId: number,
  desaId?: number,
  kelompokId?: number
) {
  try {
    const conditions: (SQL<unknown> | undefined)[] = [
      eq(pengajarTable.daerahId, daerahId),
    ];

    if (desaId) {
      conditions.push(eq(pengajarTable.desaId, desaId));
    }

    if (kelompokId) {
      conditions.push(eq(pengajarTable.kelompokId, kelompokId));
    }

    return await db.$count(pengajarTable, and(...conditions));
  } catch (error) {
    console.error("Failed to get Count Pengajar", error);
    throw InternalError;
  }
}

export async function getAllPengajarChart(
  daerahId: number,
  desaId?: number,
  kelompokId?: number
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(pengajarTable.daerahId, daerahId),
  ];

  if (desaId) {
    conditions.push(eq(pengajarTable.desaId, desaId));
  }

  if (kelompokId) {
    conditions.push(eq(pengajarTable.kelompokId, kelompokId));
  }

  return await db
    .select({
      gender: pengajarTable.gender,
      status: pengajarTable.status,
    })
    .from(pengajarTable)
    .where(and(...conditions));
}

export async function getPengajarById(kelompokId: number, id: number) {
  try {
    return await db.query.pengajarTable.findFirst({
      where: and(
        eq(pengajarTable.kelompokId, kelompokId),
        eq(pengajarTable.id, id)
      ),
      columns: {
        id: true,
        foto: true,
      },
    });
  } catch (error) {
    console.error("Failed to get Pengajar By Id", error);
    throw InternalError;
  }
}

export async function createPengajar(wilayah: TWilayah, data: TPengajarCreate) {
  try {
    return await db.insert(pengajarTable).values({
      ...data,
      ...wilayah,
    });
  } catch (error) {
    console.error("Failed to create Pengajar", error);
    throw InternalError;
  }
}

export async function updatePengajar(
  id: number,
  kelompokId: number,
  data: TPengajarCreate
) {
  try {
    return await db
      .update(pengajarTable)
      .set(data)
      .where(
        and(eq(pengajarTable.id, id), eq(pengajarTable.kelompokId, kelompokId))
      );
  } catch (error) {
    console.error("Failed to Update Pengajar", error);
    throw InternalError;
  }
}

export async function deletePengajar(kelompokId: number, id: number[]) {
  try {
    return await db
      .delete(pengajarTable)
      .where(
        and(
          inArray(pengajarTable.id, id),
          eq(pengajarTable.kelompokId, kelompokId)
        )
      );
  } catch (error) {
    console.error("Failed to delete Pengajar", error);
    throw InternalError;
  }
}
