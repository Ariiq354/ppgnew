import { updateMusyawarah } from "~~/server/repository/musyawarah.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["manage"] });
  const id = OParam.parse(getRouterParam(event, "id"));

  const body = await readValidatedBody(event, (b) => ONamaTanggal.parse(b));

  await updateMusyawarah(id, user.daerahId, body);

  return HttpResponse();
});
