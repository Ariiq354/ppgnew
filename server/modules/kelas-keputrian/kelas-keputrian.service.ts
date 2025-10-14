import {
  createKelasKeputrian,
  deleteKelasKeputrian,
  getAllKelasKeputrian,
  getAllKelasKeputrianExport,
  getAllKelasKeputrianOptions,
  getCountKelasKeputrian,
  getKelasKeputrianById,
  updateKelasKeputrian,
} from "./kelas-keputrian.repo";

export async function getAllKelasKeputrianService(
  daerahId: number,
  params: TKelasList
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
  query: TKelasOptionsList
) {
  return await getAllKelasKeputrianOptions(daerahId, query);
}

export async function getCountKelasKeputrianService(
  daerahId: number,
  kelasDesaPengajian: string
) {
  return await getCountKelasKeputrian(daerahId, kelasDesaPengajian);
}

export async function createKelasKeputrianService(
  daerahId: number,
  data: TNamaTanggal
) {
  return await createKelasKeputrian(daerahId, data);
}

export async function updateKelasKeputrianService(
  id: number,
  daerahId: number,
  data: TNamaTanggal
) {
  return await updateKelasKeputrian(id, daerahId, data);
}

export async function deleteKelasKeputrianService(
  daerahId: number,
  id: number[]
) {
  return await deleteKelasKeputrian(daerahId, id);
}
