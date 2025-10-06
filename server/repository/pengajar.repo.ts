import { and, eq, inArray, like, or, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { pengajarTable } from "~~/server/database/schema/pengajar";
import { kelompokTable } from "~~/server/database/schema/wilayah";
import type { TWilayah } from "~~/server/utils/dto";
import type { TPengajarCreate, TPengajarList } from "../api/v1/pengajar/_dto";

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

  const total = await tryCatch(
    "Failed to get total count of Pengajar",
    await to(db.$count(query))
  );

  const data = await tryCatch(
    "Failed to get list of Pengajar",
    await to(query.limit(limit).offset(offset))
  );

  return { data, total };
}

export async function getAllPengajarExport(kelompokId: number) {
  return await tryCatch(
    "Failed to get all Pengajar for export",
    await to(
      db
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
        .where(eq(pengajarTable.kelompokId, kelompokId))
    )
  );
}

export async function getAllPengajarExportDesa(desaId: number) {
  return await tryCatch(
    "Failed to get Pengajar for export by Desa",
    await to(
      db
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
        .leftJoin(kelompokTable, eq(kelompokTable.id, pengajarTable.kelompokId))
    )
  );
}

export async function getCountPengajar(
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

  return await tryCatch(
    "Failed to get count of Pengajar",
    await to(db.$count(pengajarTable, and(...conditions)))
  );
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

  return await tryCatch(
    "Failed to get Pengajar for chart",
    await to(
      db
        .select({
          gender: pengajarTable.gender,
          status: pengajarTable.status,
        })
        .from(pengajarTable)
        .where(and(...conditions))
    )
  );
}

export async function getPengajarById(kelompokId: number, id: number) {
  return await tryCatch(
    "Failed to get Pengajar by Id",
    await to(
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
    )
  );
}

export async function createPengajar(wilayah: TWilayah, data: TPengajarCreate) {
  return await tryCatch(
    "Failed to create Pengajar",
    await to(
      db.insert(pengajarTable).values({
        ...data,
        ...wilayah,
      })
    )
  );
}

export async function updatePengajar(
  id: number,
  kelompokId: number,
  data: TPengajarCreate
) {
  return await tryCatch(
    "Failed to update Pengajar",
    await to(
      db
        .update(pengajarTable)
        .set(data)
        .where(
          and(
            eq(pengajarTable.id, id),
            eq(pengajarTable.kelompokId, kelompokId)
          )
        )
    )
  );
}

export async function deletePengajar(kelompokId: number, id: number[]) {
  return await tryCatch(
    "Failed to delete Pengajar",
    await to(
      db
        .delete(pengajarTable)
        .where(
          and(
            inArray(pengajarTable.id, id),
            eq(pengajarTable.kelompokId, kelompokId)
          )
        )
    )
  );
}
