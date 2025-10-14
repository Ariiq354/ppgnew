import { createPengajarService } from "~~/server/modules/pengajar";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });

  const result = await readMultipartFormData(event);

  await createPengajarService(user, result);

  return HttpResponse();
});
