import {
  getLaporanMuslimunByMusyawarahIdService,
  OLaporanMuslimunList,
} from "~~/server/modules/laporan-muslimun";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OLaporanMuslimunList.parse(q)
  );

  const data = await getLaporanMuslimunByMusyawarahIdService(
    user.kelompokId!,
    query
  );

  return HttpResponse(data.data);
});
