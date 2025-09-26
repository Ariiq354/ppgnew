import { deleteLaporanMusyawarahService } from "~~/server/services/musyawarah/laporan-musyawarah.service";
import { OLaporanMusyawarahDelete } from "./_dto";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_ppg: ["manage"] });
  const body = await readValidatedBody(event, (b) =>
    OLaporanMusyawarahDelete.parse(b)
  );

  await deleteLaporanMusyawarahService(user, body);

  return HttpResponse();
});
