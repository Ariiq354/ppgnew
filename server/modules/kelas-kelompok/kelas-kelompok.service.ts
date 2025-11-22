import type {
  TKelasGenerusList,
  TNamaGenerusTanggal,
} from "~~/server/utils/dto/kelas.dto";
import type { kelasGenerusEnum } from "~~/shared/enum";
import {
  createKelas,
  deleteKelas,
  getAllKelas,
  getAllKelasExport,
  getAllKelasOptions,
  getCountKelasPerKelompok,
  getKelasByDaerahId,
  getKelasById,
  getKelasByKelompokId,
  updateKelas,
} from "./kelas-kelompok.repo";

export async function getAllKelasService(
  kelompokId: number,
  params: TKelasGenerus
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
  query: TKelasGenerusList
) {
  return await getAllKelasOptions(kelompokId, query);
}

export async function getCountKelasService(params: {
  kelompokId?: number;
  desaId?: number;
  daerahId?: number;
  kelasPengajian: (typeof kelasGenerusEnum)[number];
  tahun?: number;
  bulan?: number;
}) {
  return await getCountKelasPerKelompok(params);
}

export async function getKelasByKelompokIdService(kelompokId: number) {
  return await getKelasByKelompokId(kelompokId);
}

export async function getKelasByDaerahIdService(daerahId: number) {
  return await getKelasByDaerahId(daerahId);
}

export async function createKelasService(
  kelompokId: number,
  data: TNamaGenerusTanggal
) {
  return await createKelas(kelompokId, data);
}

export async function updateKelasService(
  id: number,
  kelompokId: number,
  data: TNamaGenerusTanggal
) {
  return await updateKelas(id, kelompokId, data);
}

export async function deleteKelasService(kelompokId: number, id: number[]) {
  return await deleteKelas(kelompokId, id);
}
