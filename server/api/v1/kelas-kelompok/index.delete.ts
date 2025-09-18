import { deleteKelas } from "~~/server/services/kelas-kelompok/kelas-kelompok.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODeleteSchema.parse(b));

  await deleteKelas(user.kelompokId!, body.id);
  return HttpResponse();
});
