import type { TKonselingCreate, TKonselingUpdate } from "./konseling.dto";
import {
  createKonseling,
  deleteKonseling,
  getAllKonseling,
  getAllKonselingDaerah,
  getAllKonselingExport,
  updateKonseling,
  updateKonselingDaerah,
} from "./konseling.repo";

export async function getAllKonselingService(
  kelompokId: number,
  query: TSearchPagination
) {
  const data = await getAllKonseling(kelompokId, query);
  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return { data: data.data, metadata };
}

export async function createKonselingService(
  daerahId: number,
  kelompokId: number,
  body: TKonselingCreate
) {
  await createKonseling(daerahId, kelompokId, body);
}

export async function updateKonselingDaerahService(
  id: number,
  daerahId: number,
  body: TKonselingUpdate
) {
  await updateKonselingDaerah(id, daerahId, body);
}

export async function updateKonselingService(
  id: number,
  daerahId: number,
  kelompokId: number,
  body: TKonselingCreate
) {
  await updateKonseling(id, daerahId, kelompokId, body);
}

export async function deleteKonselingService(
  daerahId: number,
  kelompokId: number,
  id: number[]
) {
  await deleteKonseling(daerahId, kelompokId, id);
}

export async function getAllKonselingExportService(
  daerahId: number,
  kelompokId?: number
) {
  return await getAllKonselingExport(daerahId, kelompokId);
}

export async function getAllKonselingDaerahService(
  daerahId: number,
  query: TSearchPagination
) {
  const data = await getAllKonselingDaerah(daerahId, query);

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

  return {
    data: newData,
    metadata,
  };
}
