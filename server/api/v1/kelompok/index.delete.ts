import { deleteKelompok } from "~~/server/repository/kelompok.repo";

export default defineEventHandler(async (event) => {
  permissionGuard(event, { kelompok: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deleteKelompok(body.id);
  return HttpResponse();
});
