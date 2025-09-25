import { OParam } from "~~/server/utils/dto";
import { ODaerahCreate } from "./_dto";
import { updateDaerah } from "~~/server/repository/daerah.repo";

export default defineEventHandler(async (event) => {
  permissionGuard(event, { daerah: ["manage"] });
  const result = await readValidatedBody(event, (b) => ODaerahCreate.parse(b));
  const id = OParam.parse(getRouterParam(event, "id"));

  await updateDaerah(id, result);

  return HttpResponse();
});
