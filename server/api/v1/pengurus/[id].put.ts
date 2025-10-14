import { updatePengurusService } from "~~/server/modules/pengurus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["manage"] });

  const result = await readMultipartFormData(event);
  const id = OParam.parse(getRouterParam(event, "id"));

  await updatePengurusService(id, user, result);

  return HttpResponse();
});
