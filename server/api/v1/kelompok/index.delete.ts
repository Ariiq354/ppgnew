import { deleteKelompokService } from "~~/server/modules/kelompok";

export default defineEventHandler(async (event) => {
  permissionGuard(event, { kelompok: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deleteKelompokService(body.id);
  return HttpResponse();
});
