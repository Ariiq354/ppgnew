import { deletePengurus } from "~~/server/services/pengurus/pengurus.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["delete"] });
  const body = await readValidatedBody(event, (b) => ODeleteSchema.parse(b));

  await deletePengurus(user.daerahId, body.id);
  return HttpResponse();
});
