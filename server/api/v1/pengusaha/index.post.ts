import { OPengusahaCreate } from "~~/server/services/pengusaha/pengusaha.dto";
import { createPengusaha } from "~~/server/services/pengusaha/pengusaha.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kemandirian: ["manage"] });

  const body = await readValidatedBody(event, (b) => OPengusahaCreate.parse(b));

  await createPengusaha(user.daerahId, body);

  return HttpResponse();
});
