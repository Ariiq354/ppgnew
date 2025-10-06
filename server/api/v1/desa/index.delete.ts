import { deleteDesaService } from "~~/server/modules/desa";

export default defineEventHandler(async (event) => {
  permissionGuard(event, { desa: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deleteDesaService(body.id);
  return HttpResponse();
});
