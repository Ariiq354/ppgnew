import { createDaerahService, ODaerahCreate } from "~~/server/modules/daerah";

export default defineEventHandler(async (event) => {
  adminGuard(event);

  const body = await readValidatedBody(event, (b) => ODaerahCreate.parse(b));

  await createDaerahService(body);

  return HttpResponse();
});
