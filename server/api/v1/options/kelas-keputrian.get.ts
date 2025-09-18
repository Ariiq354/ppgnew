import { OKelasKeputrianOptionsList } from "~~/server/services/kelas-keputrian/dto/kelas-keputrian.dto";
import { getAllKelasKeputrianOptions } from "~~/server/services/kelas-keputrian/kelas-keputrian.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OKelasKeputrianOptionsList.parse(q)
  );

  const data = await getAllKelasKeputrianOptions(user.daerahId, query);

  return HttpResponse(data.data);
});
