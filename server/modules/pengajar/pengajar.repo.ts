import { and, desc, eq, inArray, like, or, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { pengajarTable } from "~~/server/database/schema/pengajar";
import { desaTable, kelompokTable } from "~~/server/database/schema/wilayah";
import type { TWilayah } from "~~/server/utils/dto/common.dto";
import type { TPengajarCreate, TPengajarList } from "./pengajar.dto";

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
    .innerJoin(kelompokTable, eq(pengajarTable.kelompokId, kelompokTable.id))
    .orderBy(desc(pengajarTable.id));

  const total = await tryCatch(
    "Failed to get total count of Pengajar",
    db.$count(query)
  );

  const data = await tryCatch(
    "Failed to get list of Pengajar",
    query.limit(limit).offset(offset)
  );

  return { data, total };
}

export async function getAllPengajarExport(params: {
  kelompokId?: number;
  desaId?: number;
}) {
  const baseQuery = db
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
    .innerJoin(kelompokTable, eq(kelompokTable.id, pengajarTable.kelompokId));

  if (params.kelompokId)
    baseQuery.where(eq(pengajarTable.kelompokId, params.kelompokId));
  else if (params.desaId)
    baseQuery.where(eq(kelompokTable.desaId, params.desaId));

  return await tryCatch("Failed to get all Pengajar for export", baseQuery);
}

export async function getAllPengajarChart(params: {
  daerahId?: number;
  desaId?: number;
  kelompokId?: number;
}) {
  const { daerahId, desaId, kelompokId } = params;

  const conditions: (SQL<unknown> | undefined)[] = [];

  if (daerahId) conditions.push(eq(desaTable.daerahId, daerahId));
  if (desaId) conditions.push(eq(kelompokTable.desaId, desaId));
  if (kelompokId) conditions.push(eq(pengajarTable.kelompokId, kelompokId));

  return await tryCatch(
    "Failed to get Pengajar for chart",
    db
      .select({
        gender: pengajarTable.gender,
        status: pengajarTable.status,
      })
      .from(pengajarTable)
      .where(and(...conditions))
      .innerJoin(kelompokTable, eq(pengajarTable.kelompokId, kelompokTable.id))
      .innerJoin(desaTable, eq(kelompokTable.desaId, desaTable.id))
  );
}

// Untuk delete foro
export async function getPengajarById(kelompokId: number, id: number) {
  return await tryCatch(
    "Failed to get Pengajar by Id",
    db.query.pengajarTable.findFirst({
      where: and(
        eq(pengajarTable.kelompokId, kelompokId),
        eq(pengajarTable.id, id)
      ),
      columns: {
        id: true,
        foto: true,
      },
    })
  );
}

export async function createPengajar(wilayah: TWilayah, data: TPengajarCreate) {
  return await tryCatch(
    "Failed to create Pengajar",
    db.insert(pengajarTable).values({
      ...data,
      ...wilayah,
    })
  );
}

export async function updatePengajar(
  id: number,
  kelompokId: number,
  data: TPengajarCreate
) {
  return await tryCatch(
    "Failed to update Pengajar",
    db
      .update(pengajarTable)
      .set(data)
      .where(
        and(eq(pengajarTable.id, id), eq(pengajarTable.kelompokId, kelompokId))
      )
  );
}

export async function deletePengajar(kelompokId: number, id: number[]) {
  return await tryCatch(
    "Failed to delete Pengajar",
    db
      .delete(pengajarTable)
      .where(
        and(
          inArray(pengajarTable.id, id),
          eq(pengajarTable.kelompokId, kelompokId)
        )
      )
  );
}
