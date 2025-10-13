import type { TNamaTanggal, TSearchPagination } from "~~/server/utils/dto";
import {
  createPengajian,
  deletePengajian,
  getAllPengajian,
  getAllPengajianExport,
  getAllPengajianOptions,
  getCountPengajian,
  getPengajianById,
  updatePengajian,
} from "./pengajian.repo";

export async function getAllPengajianService(
  kelompokId: number,
  params: TSearchPagination
) {
  const { data, total } = await getAllPengajian(kelompokId, params);
  const metadata = {
    page: params.page,
    itemPerPage: params.limit,
    total,
    totalPage: Math.ceil(total / params.limit),
  };
  return { data, metadata };
}

export async function getAllPengajianExportService(kelompokId: number) {
  return await getAllPengajianExport(kelompokId);
}

export async function getPengajianByIdService(id: number) {
  return await getPengajianById(id);
}

export async function getAllPengajianOptionsService(kelompokId: number) {
  return await getAllPengajianOptions(kelompokId);
}

export async function getCountPengajianService(kelompokId: number) {
  return await getCountPengajian(kelompokId);
}

export async function createPengajianService(
  kelompokId: number,
  data: TNamaTanggal
) {
  return await createPengajian(kelompokId, data);
}

export async function updatePengajianService(
  id: number,
  kelompokId: number,
  data: TNamaTanggal
) {
  return await updatePengajian(id, kelompokId, data);
}

export async function deletePengajianService(kelompokId: number, id: number[]) {
  return await deletePengajian(kelompokId, id);
}
