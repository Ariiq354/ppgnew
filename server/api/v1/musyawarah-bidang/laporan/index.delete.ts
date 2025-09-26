import { deleteLaporanMusyawarahBidangService } from "~~/server/services/musyawarah-bidang/laporan-musyawarah-bidang.service";
import { OLaporanMusyawarahBidangDelete } from "./_dto";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_bidang: ["manage"] });
  const body = await readValidatedBody(event, (b) =>
    OLaporanMusyawarahBidangDelete.parse(b)
  );

  await deleteLaporanMusyawarahBidangService(user, body);

  return HttpResponse();
});
