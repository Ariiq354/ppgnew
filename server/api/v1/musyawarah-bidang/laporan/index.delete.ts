import { OLaporanMusyawarahDelete } from "~~/server/modules/laporan-musyawarah";
import { deleteLaporanMusyawarahBidangService } from "~~/server/modules/laporan-musyawarah-bidang";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_bidang: ["manage"] });
  const body = await readValidatedBody(event, (b) =>
    OLaporanMusyawarahDelete.parse(b)
  );

  await deleteLaporanMusyawarahBidangService(user, body);

  return HttpResponse();
});
