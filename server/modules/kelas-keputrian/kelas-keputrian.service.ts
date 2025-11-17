import type { kelasMudamudiEnum } from "~~/shared/enum";
import {
  createKelasKeputrian,
  deleteKelasKeputrian,
  getAllKelasKeputrian,
  getAllKelasKeputrianExport,
  getAllKelasKeputrianOptions,
  getCountKelasKeputrian,
  getKelasKeputrianByDaerahId,
  getKelasKeputrianById,
  updateKelasKeputrian,
} from "./kelas-keputrian.repo";
import type {
  TKelasMudamudi,
  TKelasMudamudiList,
  TNamaMudamudiTanggal,
} from "~~/server/utils/dto/kelas.dto";

export async function getAllKelasKeputrianService(
  daerahId: number,
  params: TKelasMudamudi
) {
  const { data, total } = await getAllKelasKeputrian(daerahId, params);
  const metadata = {
    page: params.page,
    itemPerPage: params.limit,
    total,
    totalPage: Math.ceil(total / params.limit),
  };
  return { data, metadata };
}

export async function getAllKelasKeputrianExportService(daerahId: number) {
  return await getAllKelasKeputrianExport(daerahId);
}

export async function getKelasKeputrianByIdService(id: number) {
  return await getKelasKeputrianById(id);
}

export async function getAllKelasKeputrianOptionsService(
  daerahId: number,
  query: TKelasMudamudiList
) {
  return await getAllKelasKeputrianOptions(daerahId, query);
}

export async function getKelasKeputrianByDaerahIdService(daerahId: number) {
  return await getKelasKeputrianByDaerahId(daerahId);
}

export async function getCountKelasKeputrianService(
  daerahId: number,
  kelasPengajian: (typeof kelasMudamudiEnum)[number]
) {
  return await getCountKelasKeputrian(daerahId, kelasPengajian);
}

export async function createKelasKeputrianService(
  daerahId: number,
  data: TNamaMudamudiTanggal
) {
  return await createKelasKeputrian(daerahId, data);
}

export async function updateKelasKeputrianService(
  id: number,
  daerahId: number,
  data: TNamaMudamudiTanggal
) {
  return await updateKelasKeputrian(id, daerahId, data);
}

export async function deleteKelasKeputrianService(
  daerahId: number,
  id: number[]
) {
  return await deleteKelasKeputrian(daerahId, id);
}
