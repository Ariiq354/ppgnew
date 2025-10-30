import {
  createKelasMudamudi,
  deleteKelasMudamudi,
  getAllKelasMudamudi,
  getAllKelasMudamudiExport,
  getAllKelasMudamudiOptions,
  getCountKelasMudamudi,
  getKelasMudamudiByDaerahId,
  getKelasMudamudiById,
  updateKelasMudamudi,
} from "./kelas-mudamudi.repo";

export async function getAllKelasMudamudiService(
  daerahId: number,
  params: TKelasList
) {
  const { data, total } = await getAllKelasMudamudi(daerahId, params);
  const metadata = {
    page: params.page,
    itemPerPage: params.limit,
    total,
    totalPage: Math.ceil(total / params.limit),
  };
  return { data, metadata };
}

export async function getAllKelasMudamudiExportService(daerahId: number) {
  return await getAllKelasMudamudiExport(daerahId);
}

export async function getKelasMudamudiByIdService(id: number) {
  return await getKelasMudamudiById(id);
}

export async function getAllKelasMudamudiOptionsService(
  daerahId: number,
  query: TKelasOptionsList
) {
  return await getAllKelasMudamudiOptions(daerahId, query);
}

export async function getCountKelasMudamudiService(
  daerahId: number,
  kelasDesaPengajian: string
) {
  return await getCountKelasMudamudi(daerahId, kelasDesaPengajian);
}

export async function createKelasMudamudiService(
  daerahId: number,
  data: TNamaTanggal
) {
  return await createKelasMudamudi(daerahId, data);
}

export async function updateKelasMudamudiService(
  id: number,
  daerahId: number,
  data: TNamaTanggal
) {
  return await updateKelasMudamudi(id, daerahId, data);
}

export async function deleteKelasMudamudiService(
  daerahId: number,
  id: number[]
) {
  return await deleteKelasMudamudi(daerahId, id);
}

export async function getKelasMudamudiByDaerahIdService(daerahId: number) {
  return getKelasMudamudiByDaerahId(daerahId);
}
