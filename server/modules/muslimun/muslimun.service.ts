import type { TNamaTanggal, TSearchPagination } from "~~/server/utils/dto";
import {
  createMuslimun,
  deleteMuslimun,
  getAllMuslimun,
  getAllMuslimunOptions,
  getCountMuslimun,
  getMuslimunById,
  updateMuslimun,
} from "./muslimun.repo";

export async function getAllMuslimunService(
  kelompokId: number,
  query: TSearchPagination
) {
  const data = await getAllMuslimun(kelompokId, query);

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

export async function getMuslimunByIdService(id: number) {
  return await getMuslimunById(id);
}

export async function getAllMuslimunOptionsService(kelompokId: number) {
  return await getAllMuslimunOptions(kelompokId);
}

export async function getCountMuslimunService(kelompokId: number) {
  return await getCountMuslimun(kelompokId);
}

export async function createMuslimunService(
  kelompokId: number,
  data: TNamaTanggal
) {
  await createMuslimun(kelompokId, data);
}

export async function updateMuslimunService(
  id: number,
  kelompokId: number,
  data: TNamaTanggal
) {
  await updateMuslimun(id, kelompokId, data);
}

export async function deleteMuslimunService(kelompokId: number, id: number[]) {
  await deleteMuslimun(kelompokId, id);
}
