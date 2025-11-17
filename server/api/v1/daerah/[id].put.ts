import { ODaerahCreate, updateDaerahService } from "~~/server/modules/daerah";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const result = await readValidatedBody(event, (b) => ODaerahCreate.parse(b));
  const id = OParam.parse(getRouterParam(event, "id"));

  await updateDaerahService(id, result);

  return HttpResponse();
});
