import {
  createMusyawarah,
  deleteMusyawarah,
  getAllMusyawarah,
  getAllMusyawarahExport,
  getAllMusyawarahOptions,
  getCountMusyawarah,
  getMusyawarahById,
  updateMusyawarah,
} from "./musyawarah.repo";

export async function getAllMusyawarahBidangOptionsService(daerahId: number) {
  return await getAllMusyawarahOptions(daerahId);
}

export async function createMusyawarahService(
  daerahId: number,
  body: TNamaTanggal
) {
  await createMusyawarah(daerahId, body);
}

export async function getAllMusyawarahService(
  daerahId: number,
  query: TSearchPagination
) {
  const { data, total } = await getAllMusyawarah(daerahId, query);
  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: total,
    totalPage: Math.ceil(total / query.limit),
  };
  return { data, metadata };
}

export async function deleteMusyawarahService(daerahId: number, body: TDelete) {
  await deleteMusyawarah(daerahId, body.id);
}

export async function updateMusyawarahService(
  id: number,
  daerahId: number,
  body: TNamaTanggal
) {
  await updateMusyawarah(id, daerahId, body);
}

export async function getAllMusyawarahExportService(daerahId: number) {
  return await getAllMusyawarahExport(daerahId);
}

export async function getAllMusyawarahOptionsService(daerahId: number) {
  return await getAllMusyawarahOptions(daerahId);
}

export async function getCountMusyawarahService(daerahId: number) {
  return await getCountMusyawarah(daerahId);
}

export async function getMusyawarahByIdService(id: number) {
  return await getMusyawarahById(id);
}
