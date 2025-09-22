import { getAllKelasKeputrianOptions } from "~~/server/services/kelas-keputrian/kelas-keputrian.service";
import { OKelasOptionsList } from "~~/server/utils/dto";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OKelasOptionsList.parse(q)
  );

  const data = await getAllKelasKeputrianOptions(user.daerahId, query);

  return HttpResponse(data.data);
});
