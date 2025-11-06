import { getAbsensiDesaKelompokService } from "~~/server/modules/absensi-desa";
import { OGenerusAbsensiKelompokList } from "~~/server/modules/absensi-generus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OGenerusAbsensiKelompokList.parse(q)
  );

  const data = await getAbsensiDesaKelompokService(user.desaId!, query);

  return HttpResponse(data.data, data.metadata);
});
