import { deleteKelompok } from "~~/server/services/kelompok/kelompok.service";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const body = await readValidatedBody(event, (b) => ODeleteSchema.parse(b));

  await deleteKelompok(body.id);
  return HttpResponse();
});
