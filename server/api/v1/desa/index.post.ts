import { createDesaService, ODesaCreate } from "~~/server/modules/desa";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const body = await readValidatedBody(event, (b) => ODesaCreate.parse(b));

  await createDesaService(body);

  return HttpResponse();
});
