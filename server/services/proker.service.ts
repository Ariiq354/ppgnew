import {
  createProker,
  deleteProker,
  getAllProker,
  getAllProkerExport,
  updateProker,
} from "~~/server/repository/proker.repo";
import type { UserWithId } from "../utils/auth";
import type { TProkerCreate, TProkerList } from "../api/v1/proker/_dto";
import { viewWhitelist } from "~~/shared/permission";
import { exportToXlsx } from "../utils/export";
import type { H3Event } from "h3";

export async function createProkerService(
  user: UserWithId,
  body: TProkerCreate
) {
  if (user.role !== "admin" && user.role !== body.bidang) {
    throw createError({ statusCode: 403, statusMessage: "Unauthorized" });
  }

  return await createProker(user.daerahId, body);
}

export async function getAllProkerService(
  user: UserWithId,
  query: TProkerList
) {
  if (!viewWhitelist.has(user.role!) && user.role !== query.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  return await getAllProker(user.daerahId, query);
}

export async function deleteProkerService(
  user: UserWithId,
  body: TDeleteBidang
) {
  if (user.role !== "admin" && user.role !== body.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  return await deleteProker(user.daerahId, body.bidang, body.id);
}

export async function exportProkerService(
  event: H3Event,
  user: UserWithId,
  query: TBidangSchema
) {
  if (!viewWhitelist.has(user.role!) && user.role !== query.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  const data = await getAllProkerExport(user.daerahId, query.bidang);

  return exportToXlsx(event, "proker", data);
}

export async function updateProkerService(
  id: number,
  user: UserWithId,
  body: TProkerCreate
) {
  if (user.role !== "admin" && user.role !== body.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  await updateProker(id, user.daerahId, body);
}
