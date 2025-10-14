import {
  createKelasGps,
  deleteKelasGps,
  getAllKelasGps,
  getAllKelasGpsExport,
  getAllKelasGpsOptions,
  getCountKelasGps,
  getKelasGpsById,
  updateKelasGps,
} from "./kelas-gps.repo";

export async function getAllKelasGpsService(
  desaId: number,
  params: TKelasBaseList
) {
  const { data, total } = await getAllKelasGps(desaId, params);
  const metadata = {
    page: params.page,
    itemPerPage: params.limit,
    total,
    totalPage: Math.ceil(total / params.limit),
  };
  return { data, metadata };
}

export async function getAllKelasGpsExportService(desaId: number) {
  return await getAllKelasGpsExport(desaId);
}

export async function getKelasGpsByIdService(id: number) {
  return await getKelasGpsById(id);
}

export async function getAllKelasGpsOptionsService(desaId: number) {
  return await getAllKelasGpsOptions(desaId);
}

export async function getCountKelasGpsService(
  desaId: number,
  kelasDesaPengajian: string
) {
  return await getCountKelasGps(desaId, kelasDesaPengajian);
}

export async function createKelasGpsService(
  desaId: number,
  data: TNamaTanggal
) {
  return await createKelasGps(desaId, data);
}

export async function updateKelasGpsService(
  id: number,
  desaId: number,
  data: TNamaTanggal
) {
  return await updateKelasGps(id, desaId, data);
}

export async function deleteKelasGpsService(desaId: number, id: number[]) {
  return await deleteKelasGps(desaId, id);
}
