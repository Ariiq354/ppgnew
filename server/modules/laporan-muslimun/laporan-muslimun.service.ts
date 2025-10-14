import type {
  TLaporanMuslimunCreate,
  TLaporanMuslimunDelete,
  TLaporanMuslimunList,
} from "./laporan-muslimun.dto";
import {
  createLaporanMuslimun,
  deleteLaporanMuslimun,
  findMuslimunByKelompok,
  getLaporanMuslimunByMusyawarahId,
} from "./laporan-muslimun.repo";

export async function getLaporanMuslimunByMusyawarahIdService(
  kelompokId: number,
  query: TLaporanMuslimunList
) {
  return await getLaporanMuslimunByMusyawarahId(kelompokId, query);
}

export async function createLaporanMuslimunService(
  kelompokId: number,
  body: TLaporanMuslimunCreate
) {
  const exist = await findMuslimunByKelompok(body.musyawarahId, kelompokId);

  if (!exist) {
    throw createError({
      status: 403,
      message: "Musyawarah tidak ada di daerah ini",
    });
  }

  await createLaporanMuslimun(body);
}

export async function deleteLaporanMuslimunService(
  kelompokId: number,
  body: TLaporanMuslimunDelete
) {
  const exist = await findMuslimunByKelompok(body.musyawarahId, kelompokId);

  if (!exist) {
    throw createError({
      status: 403,
      message: "Musyawarah tidak ada di daerah ini",
    });
  }

  await deleteLaporanMuslimun(body.id, body.musyawarahId);
}
