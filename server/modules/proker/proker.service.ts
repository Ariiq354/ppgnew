import {
  createProker,
  deleteProker,
  getAllProker,
  getAllProkerExport,
  updateProker,
} from "./proker.repo";
import { viewWhitelist } from "~~/shared/permission";
import type { H3Event } from "h3";
import type { TProkerCreate, TProkerList } from "./proker.dto";
import { ForbiddenError } from "~~/server/utils/errors";

export async function createProkerService(
  user: UserWithId,
  body: TProkerCreate
) {
  if (user.role !== "admin" && user.role !== body.bidang) {
    throw ForbiddenError;
  }

  return await createProker(user.daerahId, body);
}

export async function getAllProkerService(
  user: UserWithId,
  query: TProkerList
) {
  if (!viewWhitelist.has(user.role!) && user.role !== query.bidang) {
    throw ForbiddenError;
  }

  const { data, total, totalBiaya } = await getAllProker(user.daerahId, query);

  const newData = data.map((i) => ({
    ...i,
    totalBiaya,
  }));

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: total,
    totalPage: Math.ceil(total / query.limit),
  };

  return {
    data: newData,
    metadata,
  };
}

export async function getAllProkerDaerahService(
  daerahId: number,
  query: TProkerList
) {
  const { data, total, totalBiaya } = await getAllProker(daerahId, query);

  const newData = data.map((i) => ({
    ...i,
    totalBiaya,
  }));

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: total,
    totalPage: Math.ceil(total / query.limit),
  };

  return {
    data: newData,
    metadata,
  };
}

export async function deleteProkerService(
  user: UserWithId,
  body: TDeleteBidang
) {
  if (user.role !== "admin" && user.role !== body.bidang) {
    throw ForbiddenError;
  }

  return await deleteProker(user.daerahId, body.bidang, body.id);
}

export async function exportProkerService(
  event: H3Event,
  user: UserWithId,
  query: TBidang
) {
  if (!viewWhitelist.has(user.role!) && user.role !== query.bidang) {
    throw ForbiddenError;
  }

  const data = await getAllProkerExport(user.daerahId, query.bidang);

  return await exportToXlsx(event, "proker", data);
}

export async function updateProkerService(
  id: number,
  user: UserWithId,
  body: TProkerCreate
) {
  if (user.role !== "admin" && user.role !== body.bidang) {
    throw ForbiddenError;
  }

  await updateProker(id, user.daerahId, body);
}
