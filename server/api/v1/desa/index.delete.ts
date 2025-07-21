import { deleteDesa } from "~~/server/services/desa/desa.service";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const body = await readValidatedBody(event, (b) => ODeleteSchema.parse(b));

  await deleteDesa(body.id);
  return HttpResponse();
});
