import {
  deleteLaporanMusyawarahService,
  OLaporanMusyawarahDelete,
} from "~~/server/modules/laporan-musyawarah";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_ppg: ["manage"] });
  const body = await readValidatedBody(event, (b) =>
    OLaporanMusyawarahDelete.parse(b)
  );

  await deleteLaporanMusyawarahService(user, body);

  return HttpResponse();
});
