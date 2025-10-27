import { getAllKelasDesaOptionsService } from "~~/server/modules/kelas-desa";
import { OKelasOptionsList } from "~~/server/utils/dto";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OKelasOptionsList.parse(q)
  );

  const data = await getAllKelasDesaOptionsService(user.desaId!, query);

  return HttpResponse(data.data);
});
