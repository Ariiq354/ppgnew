import { getGenerusByIdService } from "../generus";
import type { TKonselingCreate, TKonselingUpdate } from "./konseling.dto";
import {
  createKonseling,
  deleteKonseling,
  getAllKonseling,
  getAllKonselingExport,
  getKonselingByDaerahId,
  updateKonseling,
  updateKonselingDaerah,
} from "./konseling.repo";

export async function getAllKonselingService(
  kelompokId: number,
  query: TSearchPagination
) {
  const data = await getAllKonseling({ kelompokId }, query);

  const newData = data.data.map(({ tanggalMasukKelas, ...rest }) => ({
    ...rest,
    kelasSekolah: getCurrentKelas(rest.kelasSekolah!, tanggalMasukKelas!),
  }));

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return { data: newData, metadata };
}

export async function getAllKonselingDaerahService(
  daerahId: number,
  query: TSearchPagination
) {
  const data = await getAllKonseling({ daerahId }, query);

  const newData = data.data.map(({ tanggalMasukKelas, ...rest }) => ({
    ...rest,
    kelasSekolah: getCurrentKelas(rest.kelasSekolah!, tanggalMasukKelas!),
  }));

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return { data: newData, metadata };
}

export async function getAllKonselingExportService(kelompokId: number) {
  return await getAllKonselingExport(kelompokId);
}

export async function createKonselingService(
  kelompokId: number,
  body: TKonselingCreate
) {
  const generus = await getGenerusByIdService(kelompokId, body.generusId);

  if (!generus) {
    throw createError({
      status: 403,
      message: "Generus tidak ada di kelompok ini",
    });
  }

  await createKonseling(kelompokId, body);
}

export async function updateKonselingDaerahService(
  id: number,
  daerahId: number,
  body: TKonselingUpdate
) {
  const generus = await getKonselingByDaerahId(id, daerahId);

  if (!generus) {
    throw createError({
      status: 403,
      message: "Generus tidak ada di daerah ini",
    });
  }

  await updateKonselingDaerah(id, body);
}

export async function updateKonselingService(
  id: number,
  kelompokId: number,
  body: TKonselingCreate
) {
  const generus = await getGenerusByIdService(kelompokId, id);

  if (!generus) {
    throw createError({
      status: 403,
      message: "Generus tidak ada di kelompok ini",
    });
  }

  await updateKonseling(id, kelompokId, body);
}

export async function deleteKonselingService(
  kelompokId: number,
  ids: number[]
) {
  for (const id of ids) {
    const generus = await getGenerusByIdService(kelompokId, id);

    if (!generus) {
      throw createError({
        status: 403,
        message: "Generus tidak ada di kelompok ini",
      });
    }
  }

  await deleteKonseling(kelompokId, ids);
}
