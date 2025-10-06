import { createDesaService, ODesaCreate } from "~~/server/modules/desa";

export default defineEventHandler(async (event) => {
  permissionGuard(event, { desa: ["manage"] });

  const body = await readValidatedBody(event, (b) => ODesaCreate.parse(b));

  await createDesaService(body);

  return HttpResponse();
});
