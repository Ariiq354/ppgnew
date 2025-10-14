import {
  getAllKelas,
  getAllKelasExport,
  getKelasById,
  getAllKelasOptions,
  getCountKelas,
  getKelasByKelompokId,
  createKelas,
  updateKelas,
  deleteKelas,
} from "./kelas-kelompok.repo";
import type {
  TKelasList,
  TKelasOptionsList,
  TNamaTanggal,
} from "~~/server/utils/dto";

export async function getAllKelasService(
  kelompokId: number,
  params: TKelasList
) {
  const { data, total } = await getAllKelas(kelompokId, params);
  const metadata = {
    page: params.page,
    itemPerPage: params.limit,
    total,
    totalPage: Math.ceil(total / params.limit),
  };
  return { data, metadata };
}

export async function getAllKelasExportService(kelompokId: number) {
  return await getAllKelasExport(kelompokId);
}

export async function getKelasByIdService(id: number) {
  return await getKelasById(id);
}

export async function getAllKelasOptionsService(
  kelompokId: number,
  query: TKelasOptionsList
) {
  return await getAllKelasOptions(kelompokId, query);
}

export async function getCountKelasService(
  kelompokId: number,
  kelasPengajian: string
) {
  return await getCountKelas(kelompokId, kelasPengajian);
}

export async function getKelasByKelompokIdService(kelompokId: number) {
  return await getKelasByKelompokId(kelompokId);
}

export async function createKelasService(
  kelompokId: number,
  data: TNamaTanggal
) {
  return await createKelas(kelompokId, data);
}

export async function updateKelasService(
  id: number,
  kelompokId: number,
  data: TNamaTanggal
) {
  return await updateKelas(id, kelompokId, data);
}

export async function deleteKelasService(kelompokId: number, id: number[]) {
  return await deleteKelas(kelompokId, id);
}
