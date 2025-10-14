import { deleteKelasService } from "~~/server/modules/kelas-kelompok";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deleteKelasService(user.kelompokId!, body.id);
  return HttpResponse();
});
