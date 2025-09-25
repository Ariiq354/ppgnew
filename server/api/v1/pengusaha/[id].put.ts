import { OPengusahaCreate } from "~~/server/api/v1/pengusaha/_dto";
import { updatePengusaha } from "~~/server/repository/pengusaha.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kemandirian: ["manage"] });
  const id = OParam.parse(getRouterParam(event, "id"));

  const body = await readValidatedBody(event, (b) => OPengusahaCreate.parse(b));

  await updatePengusaha(id, user.daerahId, body);

  return HttpResponse();
});
