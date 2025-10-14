import { updatePengajarService } from "~~/server/modules/pengajar";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });

  const result = await readMultipartFormData(event);
  const id = OParam.parse(getRouterParam(event, "id"));

  await updatePengajarService(id, user, result);

  return HttpResponse();
});
