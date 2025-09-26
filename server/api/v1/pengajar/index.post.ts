import { createPengajarWithUpload } from "~~/server/services/pengajar.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });

  const result = await readMultipartFormData(event);

  await createPengajarWithUpload(user, result);

  return HttpResponse();
});
