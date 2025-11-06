import type { TSearchPagination } from "~~/server/utils/dto";
import type { TPengusahaCreate } from "./pengusaha.dto";
import {
  createPengusaha,
  deletePengusaha,
  getAllPengusaha,
  getAllPengusahaExport,
  updatePengusaha,
} from "./pengusaha.repo";

export async function getAllPengusahaService(
  daerahId: number,
  query: TSearchPagination
) {
  const data = await getAllPengusaha(daerahId, query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return {
    data: data.data,
    metadata,
  };
}

export async function getAllPengusahaExportService(daerahId: number) {
  return await getAllPengusahaExport(daerahId);
}

export async function createPengusahaService(
  daerahId: number,
  data: TPengusahaCreate
) {
  return await createPengusaha(daerahId, data);
}

export async function updatePengusahaService(
  id: number,
  daerahId: number,
  data: TPengusahaCreate
) {
  return await updatePengusaha(id, daerahId, data);
}

export async function deletePengusahaService(daerahId: number, ids: number[]) {
  return await deletePengusaha(daerahId, ids);
}
