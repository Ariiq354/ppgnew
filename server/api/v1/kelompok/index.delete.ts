import { deleteKelompok } from "~~/server/services/kelompok/kelompok.service";

export default defineEventHandler(async (event) => {
  permissionGuard(event, { kelompok: ["delete"] });
  const body = await readValidatedBody(event, (b) => ODeleteSchema.parse(b));

  await deleteKelompok(body.id);
  return HttpResponse();
});
