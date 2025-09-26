import { deleteKelas } from "~~/server/repository/kelas-kelompok.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deleteKelas(user.kelompokId!, body.id);
  return HttpResponse();
});
