import type {
  TKelasList,
  TKelasOptionsList,
  TNamaTanggal,
} from "~~/server/utils/dto";
import {
  createKelas,
  deleteKelas,
  getAllKelas,
  getAllKelasExport,
  getAllKelasOptions,
  getCountKelas,
  getKelasByDaerahId,
  getKelasById,
  getKelasByKelompokId,
  updateKelas,
} from "./kelas-kelompok.repo";

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
  params: {
    kelompokId?: number;
    desaId?: number;
    daerahId?: number;
  },
  kelasPengajian: string
) {
  return await getCountKelas(params, kelasPengajian);
}

export async function getKelasByKelompokIdService(kelompokId: number) {
  return await getKelasByKelompokId(kelompokId);
}

export async function getKelasByDaerahIdService(daerahId: number) {
  return await getKelasByDaerahId(daerahId);
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
