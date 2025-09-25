import { deleteDesa } from "~~/server/repository/desa.repo";

export default defineEventHandler(async (event) => {
  permissionGuard(event, { desa: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deleteDesa(body.id);
  return HttpResponse();
});
