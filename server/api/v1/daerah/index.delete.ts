import { deleteDaerahService } from "~~/server/modules/daerah";

export default defineEventHandler(async (event) => {
  permissionGuard(event, { daerah: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deleteDaerahService(body.id);

  return HttpResponse();
});
