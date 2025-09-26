import { createLaporanMusyawarahBidangService } from "~~/server/services/musyawarah-bidang/laporan-musyawarah-bidang.service";
import { OLaporanMusyawarahBidangCreate } from "./_dto";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_bidang: ["manage"] });

  const body = await readValidatedBody(event, (b) =>
    OLaporanMusyawarahBidangCreate.parse(b)
  );

  await createLaporanMusyawarahBidangService(user, body);

  return HttpResponse();
});
