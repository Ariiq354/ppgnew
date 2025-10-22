import type { H3Event } from "h3";
import { viewWhitelist } from "~~/shared/permission";
import type {
  TMusyawarahBidangCreate,
  TMusyawarahBidangList,
} from "./musyawarah-bidang.dto";
import {
  createMusyawarahBidang,
  deleteMusyawarahBidang,
  getAllMusyawarahBidang,
  getAllMusyawarahBidangExport,
  getAllMusyawarahBidangOptions,
  updateMusyawarahBidang,
} from "./musyawarah-bidang.repo";

export async function getAllMusyawarahBidangOptionsService(
  user: UserWithId,
  query: TBidangSchema
) {
  if (!viewWhitelist.has(user.role!) && user.role !== query.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  return await getAllMusyawarahBidangOptions(user.daerahId, query.bidang);
}

export async function createMusyawarahBidangService(
  user: UserWithId,
  body: TMusyawarahBidangCreate
) {
  if (user.role !== "admin" && user.role !== body.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  await createMusyawarahBidang(user.daerahId, body);
}

export async function getAllMusyawarahBidangService(
  user: UserWithId,
  query: TMusyawarahBidangList
) {
  if (!viewWhitelist.has(user.role!) && user.role !== query.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  const { data, total } = await getAllMusyawarahBidang(user.daerahId, query);
  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: total,
    totalPage: Math.ceil(total / query.limit),
  };
  return { data, metadata };
}

export async function deleteMusyawarahBidangService(
  user: UserWithId,
  body: TDeleteBidang
) {
  if (user.role !== "admin" && user.role !== body.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  await deleteMusyawarahBidang(user.daerahId, body.bidang, body.id);
}

export async function updateMusyawarahBidangService(
  id: number,
  user: UserWithId,
  body: TMusyawarahBidangCreate
) {
  if (user.role !== "admin" && user.role !== body.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  await updateMusyawarahBidang(id, user.daerahId, body);
}

export async function exportMusyawarahBidangService(
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

  const data = await getAllMusyawarahBidangExport(user.daerahId, query.bidang);

  return await exportToXlsx(event, "musyawarah-bidang", data);
}
