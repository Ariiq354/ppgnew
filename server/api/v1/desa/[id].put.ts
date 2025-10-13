import { ODesaCreate, updateDesaService } from "~~/server/modules/desa";
import { OParam } from "~~/server/utils/dto";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const result = await readValidatedBody(event, (b) => ODesaCreate.parse(b));
  const id = OParam.parse(getRouterParam(event, "id"));

  await updateDesaService(id, result);

  return HttpResponse();
});
