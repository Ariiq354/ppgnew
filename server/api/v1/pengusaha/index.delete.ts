import { deletePengusahaService } from "~~/server/modules/pengusaha";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kemandirian: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deletePengusahaService(user.daerahId, body.id);
  return HttpResponse();
});
