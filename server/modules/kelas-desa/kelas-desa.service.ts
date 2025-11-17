import type {
  TKelasGenerus,
  TKelasGenerusList,
  TNamaGenerusTanggal,
} from "~~/server/utils/dto/kelas.dto";
import {
  createKelasDesa,
  deleteKelasDesa,
  getAllKelasDesa,
  getAllKelasDesaExport,
  getAllKelasDesaOptions,
  getCountKelasDesa,
  getKelasByDesaId,
  getKelasDesaById,
  updateKelasDesa,
} from "./kelas-desa.repo";
import type { kelasGenerusEnum } from "~~/shared/enum";

export async function getAllKelasDesaService(
  desaId: number,
  params: TKelasGenerus
) {
  const { data, total } = await getAllKelasDesa(desaId, params);
  const metadata = {
    page: params.page,
    itemPerPage: params.limit,
    total,
    totalPage: Math.ceil(total / params.limit),
  };
  return { data, metadata };
}

export async function getAllKelasDesaExportService(desaId: number) {
  return await getAllKelasDesaExport(desaId);
}

export async function getKelasByDesaIdService(desaId: number) {
  return await getKelasByDesaId(desaId);
}

export async function getKelasDesaByIdService(id: number) {
  return await getKelasDesaById(id);
}

export async function getAllKelasDesaOptionsService(
  desaId: number,
  query: TKelasGenerusList
) {
  return await getAllKelasDesaOptions(desaId, query);
}

export async function getCountKelasDesaService(
  params: {
    desaId?: number;
    daerahId?: number;
  },
  kelasDesaPengajian: (typeof kelasGenerusEnum)[number]
) {
  return await getCountKelasDesa(params, kelasDesaPengajian);
}

export async function createKelasDesaService(
  desaId: number,
  data: TNamaGenerusTanggal
) {
  return await createKelasDesa(desaId, data);
}

export async function updateKelasDesaService(
  id: number,
  desaId: number,
  data: TNamaGenerusTanggal
) {
  return await updateKelasDesa(id, desaId, data);
}

export async function deleteKelasDesaService(desaId: number, id: number[]) {
  return await deleteKelasDesa(desaId, id);
}
