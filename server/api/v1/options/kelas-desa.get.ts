import { getAllKelasDesaOptions } from "~~/server/services/kelas-desa/kelas-desa.service";
import { OKelasOptionsList } from "~~/server/utils/dto";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OKelasOptionsList.parse(q)
  );

  const data = await getAllKelasDesaOptions(user.daerahId, query);

  return HttpResponse(data.data);
});
