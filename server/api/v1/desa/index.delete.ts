import { deleteDesa } from "~~/server/services/desa/desa.service";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const query = await readValidatedBody(event, (query) =>
    ODeleteSchema.parse(query)
  );

  await deleteDesa(query.id);
  return HttpResponse();
});
