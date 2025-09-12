import { z } from "zod/mini";
import { OPengusahaCreate } from "~~/server/services/pengusaha/dto/pengusaha.dto";
import { updatePengusaha } from "~~/server/services/pengusaha/pengusaha.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kemandirian: ["manage"] });
  const id = getRouterParam(event, "id");
  const parsed = z.coerce.number().parse(id);

  const body = await readValidatedBody(event, (b) => OPengusahaCreate.parse(b));

  await updatePengusaha(parsed, user.daerahId, body);

  return HttpResponse();
});
