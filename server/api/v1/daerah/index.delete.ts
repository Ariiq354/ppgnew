import { deleteDaerah } from "~~/server/services/daerah/daerah.service";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const query = await readValidatedBody(event, (query) =>
    ODeleteSchema.parse(query)
  );

  await deleteDaerah(query.id);
  return HttpResponse();
});
