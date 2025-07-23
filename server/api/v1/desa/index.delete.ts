import { deleteDesa } from "~~/server/services/desa/desa.service";

export default defineEventHandler(async (event) => {
  permissionGuard(event, { desa: ["delete"] });
  const body = await readValidatedBody(event, (b) => ODeleteSchema.parse(b));

  await deleteDesa(body.id);
  return HttpResponse();
});
