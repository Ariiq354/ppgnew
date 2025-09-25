import { OParam } from "~~/server/utils/dto";
import { ODesaCreate } from "./_dto";
import { updateDesa } from "~~/server/repository/desa.repo";

export default defineEventHandler(async (event) => {
  permissionGuard(event, { desa: ["manage"] });
  const result = await readValidatedBody(event, (b) => ODesaCreate.parse(b));
  const id = OParam.parse(getRouterParam(event, "id"));

  await updateDesa(id, result);

  return HttpResponse();
});
