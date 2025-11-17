import {
  createKelasTahfidz,
  deleteKelasTahfidz,
  getAllKelasTahfidz,
  getAllKelasTahfidzExport,
  getAllKelasTahfidzOptions,
  getCountKelasTahfidz,
  getKelasTahfidzById,
  updateKelasTahfidz,
} from "./kelas-tahfidz.repo";

export async function getAllKelasTahfidzService(
  daerahId: number,
  params: TKelas
) {
  const { data, total } = await getAllKelasTahfidz(daerahId, params);
  const metadata = {
    page: params.page,
    itemPerPage: params.limit,
    total,
    totalPage: Math.ceil(total / params.limit),
  };
  return { data, metadata };
}

export async function getAllKelasTahfidzExportService(daerahId: number) {
  return await getAllKelasTahfidzExport(daerahId);
}

export async function getKelasTahfidzByIdService(id: number) {
  return await getKelasTahfidzById(id);
}

export async function getAllKelasTahfidzOptionsService(daerahId: number) {
  return await getAllKelasTahfidzOptions(daerahId);
}

export async function getCountKelasTahfidzService(daerahId: number) {
  return await getCountKelasTahfidz(daerahId);
}

export async function createKelasTahfidzService(
  daerahId: number,
  data: TNamaTanggal
) {
  return await createKelasTahfidz(daerahId, data);
}

export async function updateKelasTahfidzService(
  id: number,
  daerahId: number,
  data: TNamaTanggal
) {
  return await updateKelasTahfidz(id, daerahId, data);
}

export async function deleteKelasTahfidzService(
  daerahId: number,
  id: number[]
) {
  return await deleteKelasTahfidz(daerahId, id);
}
