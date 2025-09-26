import sanitizeHtml from "sanitize-html";
import type {
  TLaporanMusyawarahCreate,
  TLaporanMusyawarahDelete,
  TLaporanMusyawarahList,
} from "~~/server/api/v1/musyawarah/laporan/_dto";
import {
  createLaporanMusyawarah,
  deleteLaporanMusyawarah,
  findMusyawarahByDaerah,
  getLaporanMusyawarahByMusyawarahId,
} from "~~/server/repository/musyawarah/laporan-musyawarah.repo";
import { viewWhitelist } from "~~/shared/permission";

export async function getLaporanMusyawarahByMusyawarahIdService(
  user: UserWithId,
  query: TLaporanMusyawarahList
) {
  if (!viewWhitelist.has(user.role!) && user.role !== query.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  return await getLaporanMusyawarahByMusyawarahId(user.daerahId, query);
}

export async function createLaporanMusyawarahService(
  user: UserWithId,
  body: TLaporanMusyawarahCreate
) {
  if (user.role !== "admin" && user.role !== body.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  const exist = await findMusyawarahByDaerah(body.musyawarahId, user.daerahId);

  if (!exist) {
    throw createError({
      status: 403,
      message: "Musyawarah tidak ada di daerah ini",
    });
  }

  body.keterangan = sanitizeHtml(body.keterangan);

  await createLaporanMusyawarah(body);
}

export async function deleteLaporanMusyawarahService(
  user: UserWithId,
  body: TLaporanMusyawarahDelete
) {
  if (user.role !== "admin" && user.role !== body.bidang) {
    throw createError({
      statusCode: 403,
      statusMessage: "Unauthorized",
    });
  }

  const exist = await findMusyawarahByDaerah(body.musyawarahId, user.daerahId);

  if (!exist) {
    throw createError({
      status: 403,
      message: "Musyawarah tidak ada di daerah ini",
    });
  }

  await deleteLaporanMusyawarah(body.id, body.musyawarahId, body.bidang);
}
