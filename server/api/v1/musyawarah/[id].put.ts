import { z } from "zod/mini";
import { OMusyawarahCreate } from "~~/server/services/musyawarah/dto/musyawarah.dto";
import { updateMusyawarah } from "~~/server/services/musyawarah/musyawarah.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["manage"] });
  const id = getRouterParam(event, "id");
  const parsed = z.coerce.number().parse(id);

  const body = await readValidatedBody(event, (b) =>
    OMusyawarahCreate.parse(b)
  );

  await updateMusyawarah(parsed, user.daerahId, body);

  return HttpResponse();
});
