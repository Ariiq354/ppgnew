import { OPengusahaCreate } from "~~/server/api/v1/pengusaha/_dto";
import { createPengusaha } from "~~/server/repository/pengusaha.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kemandirian: ["manage"] });

  const body = await readValidatedBody(event, (b) => OPengusahaCreate.parse(b));

  await createPengusaha(user.daerahId, body);

  return HttpResponse();
});
