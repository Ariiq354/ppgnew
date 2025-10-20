import { getAllKelasOptionsService } from "~~/server/modules/kelas-kelompok";
import { OKelasOptionsList } from "~~/server/utils/dto";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OKelasOptionsList.parse(q)
  );

  const data = await getAllKelasOptionsService(user.kelompokId!, query);

  return HttpResponse(data.data);
});
