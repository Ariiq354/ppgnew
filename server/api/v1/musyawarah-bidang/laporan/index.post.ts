import {
  createLaporanMusyawarahBidangService,
  OLaporanMusyawarahBidangCreate,
} from "~~/server/modules/laporan-musyawarah-bidang";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_bidang: ["manage"] });

  const body = await readValidatedBody(event, (b) =>
    OLaporanMusyawarahBidangCreate.parse(b)
  );

  await createLaporanMusyawarahBidangService(user, body);

  return HttpResponse();
});
