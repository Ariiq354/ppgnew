import type {
  TLaporanMusyawarahCreate,
  TLaporanMusyawarahDelete,
  TLaporanMusyawarahList,
} from "../laporan-musyawarah";
import {
  createLaporanMusyawarahBidang,
  deleteLaporanMusyawarahBidang,
  getMusyawarahBidangByid,
  getLaporanMusyawarahBidang,
} from "./laporan-musyawarah-bidang.repo";
import { viewWhitelist } from "~~/shared/permission";

export async function getLaporanMusyawarahBidangService(
  user: UserWithId,
  query: TLaporanMusyawarahList
) {
  if (!viewWhitelist.has(user.role!) && user.role !== query.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  return await getLaporanMusyawarahBidang(user.daerahId, query);
}

export async function createLaporanMusyawarahBidangService(
  user: UserWithId,
  body: TLaporanMusyawarahCreate
) {
  if (user.role !== "admin" && user.role !== body.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  const exist = await getMusyawarahBidangByid(
    body.musyawarahId,
    user.daerahId,
    body.bidang
  );

  if (!exist) {
    throw createError({
      status: 403,
      message: "Musyawarah tidak ada di daerah ini",
    });
  }

  await createLaporanMusyawarahBidang(body);
}

export async function deleteLaporanMusyawarahBidangService(
  user: UserWithId,
  body: TLaporanMusyawarahDelete
) {
  if (user.role !== "admin" && user.role !== body.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  const exist = await getMusyawarahBidangByid(
    body.musyawarahId,
    user.daerahId,
    body.bidang
  );

  if (!exist) {
    throw createError({
      status: 403,
      message: "Musyawarah tidak ada di daerah ini",
    });
  }

  await deleteLaporanMusyawarahBidang(body.id, body.musyawarahId);
}
