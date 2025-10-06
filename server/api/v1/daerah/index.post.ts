import { createDaerahService, ODaerahCreate } from "~~/server/modules/daerah";

export default defineEventHandler(async (event) => {
  permissionGuard(event, { daerah: ["manage"] });

  const body = await readValidatedBody(event, (b) => ODaerahCreate.parse(b));

  await createDaerahService(body);

  return HttpResponse();
});
