import { and, eq, inArray, like, or, Param, sql, type SQL } from "drizzle-orm";
import { db } from "~~/server/database";
import { generusTable } from "~~/server/database/schema/generus";
import { kelompokTable } from "~~/server/database/schema/wilayah";
import type {
  TGenerusBaseList,
  TGenerusCreate,
  TGenerusList,
} from "../api/v1/generus/_dto";

export async function getAllGenerus(
  daerahId: number,
  { limit, page, search, kelasPengajian, desaId, kelompokId }: TGenerusList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.daerahId, daerahId),
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(or(like(generusTable.nama, searchCondition)));
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
      namaKelompok: kelompokTable.name,
    })
    .from(generusTable)
    .where(and(...conditions))
    .leftJoin(kelompokTable, eq(generusTable.kelompokId, kelompokTable.id));

  const total = await tryCatch(
    "Failed to get total count of Generus",
    await to(db.$count(query))
  );
  const data = await tryCatch(
    "Failed to get list of Generus",
    await to(query.limit(limit).offset(offset))
  );

  return { data, total };
}

export async function getAllGenerusKeputrian(
  daerahId: number,
  { limit, page, search, kelasPengajian, desaId, kelompokId }: TGenerusList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.daerahId, daerahId),
    eq(generusTable.gender, "Perempuan"),
    inArray(generusTable.kelasPengajian, [
      "Remaja",
      "Pranikah",
      "Usia Mandiri",
    ]),
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(or(like(generusTable.nama, searchCondition)));
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
    .where(and(...conditions));

  const total = await tryCatch(
    "Failed to get total count of Generus Keputrian",
    await to(db.$count(query))
  );
  const data = await tryCatch(
    "Failed to get list of Generus Keputrian",
    await to(query.limit(limit).offset(offset))
  );

  return { data, total };
}

export async function getAllGenerusMudamudi(
  daerahId: number,
  { limit, page, search, kelasPengajian, desaId, kelompokId }: TGenerusList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.daerahId, daerahId),
    inArray(generusTable.kelasPengajian, [
      "Remaja",
      "Pranikah",
      "Usia Mandiri",
    ]),
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(or(like(generusTable.nama, searchCondition)));
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
    .where(and(...conditions));

  const total = await tryCatch(
    "Failed to get total count of Generus Mudamudi",
    await to(db.$count(query))
  );
  const data = await tryCatch(
    "Failed to get list of Generus Mudamudi",
    await to(query.limit(limit).offset(offset))
  );

  return { data, total };
}

export async function getAllGenerusGPS(
  daerahId: number,
  { limit, page, search, desaId, kelompokId }: TGenerusBaseList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.daerahId, daerahId),
    sql`(${generusTable.status} ?| ${new Param(["GPS"])})`,
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(or(like(generusTable.nama, searchCondition)));
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
    .where(and(...conditions));

  const total = await tryCatch(
    "Failed to get total count of Generus GPS",
    await to(db.$count(query))
  );
  const data = await tryCatch(
    "Failed to get list of Generus GPS",
    await to(query.limit(limit).offset(offset))
  );

  return { data, total };
}

export async function getAllGenerusTahfidz(
  daerahId: number,
  { limit, page, search, desaId, kelompokId }: TGenerusBaseList
) {
  const offset = (page - 1) * limit;
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.daerahId, daerahId),
    sql`(${generusTable.status} ?| ${new Param(["Tahfidz"])})`,
  ];

  if (search) {
    const searchCondition = `%${search}%`;
    conditions.push(or(like(generusTable.nama, searchCondition)));
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
    .where(and(...conditions));

  const total = await tryCatch(
    "Failed to get total count of Generus Tahfidz",
    await to(db.$count(query))
  );
  const data = await tryCatch(
    "Failed to get list of Generus Tahfidz",
    await to(query.limit(limit).offset(offset))
  );

  return { data, total };
}

export async function getAllGenerusExport(kelompokId: number) {
  return await tryCatch(
    "Failed to export Generus data",
    await to(
      db
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
        .where(eq(generusTable.kelompokId, kelompokId))
    )
  );
}

export async function getAllGenerusExportDesa(desaId: number) {
  return await tryCatch(
    "Failed to export Generus data by Desa",
    await to(
      db
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
          namaKelompok: kelompokTable.name,
        })
        .from(generusTable)
        .where(eq(generusTable.desaId, desaId))
        .leftJoin(kelompokTable, eq(generusTable.kelompokId, kelompokTable.id))
    )
  );
}

export async function getAllGenerus69(daerahId: number) {
  return await tryCatch(
    "Failed to get Generus 69 data",
    await to(
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
    )
  );
}

export async function getGenerusOptionsKelompok(kelompokId: number) {
  return await tryCatch(
    "Failed to get Generus options for Kelompok",
    await to(
      db
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
        .where(eq(generusTable.kelompokId, kelompokId))
    )
  );
}

export async function getAllGenerusChart(
  daerahId: number,
  desaId?: number,
  kelompokId?: number
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.daerahId, daerahId),
  ];

  if (desaId) {
    conditions.push(eq(generusTable.desaId, desaId));
  }

  if (kelompokId) {
    conditions.push(eq(generusTable.kelompokId, kelompokId));
  }

  return await tryCatch(
    "Failed to get Generus chart data",
    await to(
      db
        .select({
          gender: generusTable.gender,
          kelasPengajian: generusTable.kelasPengajian,
        })
        .from(generusTable)
        .where(and(...conditions))
    )
  );
}

export async function getCountGenerus(
  daerahId: number,
  desaId?: number,
  kelompokId?: number
) {
  const conditions: (SQL<unknown> | undefined)[] = [
    eq(generusTable.daerahId, daerahId),
  ];

  if (desaId) {
    conditions.push(eq(generusTable.desaId, desaId));
  }

  if (kelompokId) {
    conditions.push(eq(generusTable.kelompokId, kelompokId));
  }

  return await tryCatch(
    "Failed to get count of Generus",
    await to(db.$count(generusTable, and(...conditions)))
  );
}

export async function getGenerusById(kelompokId: number, id: number) {
  return await tryCatch(
    "Failed to get Generus by ID",
    await to(
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
    )
  );
}

export async function createGenerus(wilayah: TWilayah, data: TGenerusCreate) {
  return await tryCatch(
    "Failed to create Generus",
    await to(
      db.insert(generusTable).values({
        ...data,
        ...wilayah,
        tanggalMasukKelas: new Date(),
      })
    )
  );
}

export async function updateGenerus(
  id: number,
  kelompokId: number,
  data: TGenerusCreate
) {
  const user = await tryCatch(
    "Failed to find Generus for update",
    await to(
      db.query.generusTable.findFirst({
        where: and(
          eq(generusTable.id, id),
          eq(generusTable.kelompokId, kelompokId)
        ),
      })
    )
  );

  const updateData: Partial<typeof generusTable.$inferInsert> = { ...data };

  if (user && user.kelasSekolah !== data.kelasSekolah) {
    updateData.tanggalMasukKelas = new Date();
  }

  return await tryCatch(
    "Failed to update Generus",
    await to(
      db
        .update(generusTable)
        .set(updateData)
        .where(
          and(eq(generusTable.id, id), eq(generusTable.kelompokId, kelompokId))
        )
    )
  );
}

export async function deleteGenerus(kelompokId: number, id: number[]) {
  return await tryCatch(
    "Failed to delete Generus",
    await to(
      db
        .delete(generusTable)
        .where(
          and(
            inArray(generusTable.id, id),
            eq(generusTable.kelompokId, kelompokId)
          )
        )
    )
  );
}
