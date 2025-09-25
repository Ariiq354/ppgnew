import { updatePengurusWithUpload } from "~~/server/services/pengurus.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["manage"] });

  const result = await readMultipartFormData(event);
  const id = OParam.parse(getRouterParam(event, "id"));

  await updatePengurusWithUpload(id, user, result);

  return HttpResponse();
});
