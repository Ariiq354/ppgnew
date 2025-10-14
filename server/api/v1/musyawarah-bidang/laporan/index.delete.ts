import {
  deleteLaporanMusyawarahBidangService,
  OLaporanMusyawarahBidangDelete,
} from "~~/server/modules/laporan-musyawarah-bidang";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_bidang: ["manage"] });
  const body = await readValidatedBody(event, (b) =>
    OLaporanMusyawarahBidangDelete.parse(b)
  );

  await deleteLaporanMusyawarahBidangService(user, body);

  return HttpResponse();
});
