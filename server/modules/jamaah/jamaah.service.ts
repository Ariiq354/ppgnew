import type { TSearchPagination, TWilayah } from "~~/server/utils/dto";
import type { TJamaahCreate } from "./jamaah.dto";
import {
  getAllJamaah,
  getAllJamaahExport,
  getAllJamaahAbsensi,
  getCountJamaah,
  createJamaah,
  updateJamaah,
  deleteJamaah,
} from "./jamaah.repo";

export async function getAllJamaahService(
  kelompokId: number,
  query: TSearchPagination
) {
  const data = await getAllJamaah(kelompokId, query);
  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };
  return { data: data.data, metadata };
}

export async function getAllJamaahExportService(kelompokId: number) {
  return await getAllJamaahExport(kelompokId);
}

export async function getAllJamaahAbsensiService(
  kelompokId: number,
  query: TSearchPagination
) {
  return await getAllJamaahAbsensi(kelompokId, query);
}

export async function getCountJamaahService(kelompokId: number) {
  return await getCountJamaah(kelompokId);
}

export async function createJamaahService(
  wilayah: TWilayah,
  data: TJamaahCreate
) {
  await createJamaah(wilayah, data);
}

export async function updateJamaahService(
  id: number,
  kelompokId: number,
  data: TJamaahCreate
) {
  await updateJamaah(id, kelompokId, data);
}

export async function deleteJamaahService(kelompokId: number, id: number[]) {
  await deleteJamaah(kelompokId, id);
}
