import { deletePengusaha } from "~~/server/services/pengusaha/pengusaha.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kemandirian: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deletePengusaha(user.daerahId, body.id);
  return HttpResponse();
});
