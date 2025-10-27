import { getAllGenerusTahfidzService } from "~~/server/modules/generus-tahfidz";
import { OGenerusBaseList } from "~~/server/utils/dto";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { tahfidz: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OGenerusBaseList.parse(q)
  );

  const data = await getAllGenerusTahfidzService(user.daerahId, query);

  return HttpResponse(data.data, data.metadata);
});
