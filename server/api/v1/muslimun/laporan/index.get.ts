import { OLaporanMuslimunList } from "~~/server/services/laporan-muslimun/laporan-muslimun.dto";
import { getLaporanMuslimunByMusyawarahId } from "~~/server/services/laporan-muslimun/laporan-muslimun.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OLaporanMuslimunList.parse(q)
  );

  const data = await getLaporanMuslimunByMusyawarahId(user.kelompokId!, query);

  return HttpResponse(data.data);
});
