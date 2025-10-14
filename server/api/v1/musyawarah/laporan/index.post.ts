import {
  createLaporanMusyawarahService,
  OLaporanMusyawarahCreate,
} from "~~/server/modules/laporan-musyawarah";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { musyawarah_ppg: ["manage"] });

  const body = await readValidatedBody(event, (b) =>
    OLaporanMusyawarahCreate.parse(b)
  );

  await createLaporanMusyawarahService(user, body);

  return HttpResponse();
});
