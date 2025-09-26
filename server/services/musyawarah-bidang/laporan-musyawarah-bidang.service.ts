import type {
  TLaporanMusyawarahBidangCreate,
  TLaporanMusyawarahBidangDelete,
  TLaporanMusyawarahBidangList,
} from "~~/server/api/v1/musyawarah-bidang/laporan/_dto";
import {
  createLaporanMusyawarahBidang,
  deleteLaporanMusyawarahBidang,
  findMusyawarahBidangByDaerah,
  getLaporanMusyawarahBidangByMusyawarahId,
} from "~~/server/repository/musyawarah-bidang/laporan-musyawarah-bidang.repo";
import { viewWhitelist } from "~~/shared/permission";

export async function getLaporanMusyawarahBidangByMusyawarahIdService(
  user: UserWithId,
  query: TLaporanMusyawarahBidangList
) {
  if (!viewWhitelist.has(user.role!) && user.role !== query.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  return getLaporanMusyawarahBidangByMusyawarahId(user.daerahId, query);
}

export async function createLaporanMusyawarahBidangService(
  user: UserWithId,
  body: TLaporanMusyawarahBidangCreate
) {
  if (user.role !== "admin" && user.role !== body.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  const exist = await findMusyawarahBidangByDaerah(
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
  body: TLaporanMusyawarahBidangDelete
) {
  if (user.role !== "admin" && user.role !== body.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  const exist = await findMusyawarahBidangByDaerah(
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
