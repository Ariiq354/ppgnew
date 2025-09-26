import { createKelas } from "~~/server/repository/kelas-kelompok.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });

  const body = await readValidatedBody(event, (b) => ONamaTanggal.parse(b));

  await createKelas(user.kelompokId!, body);

  return HttpResponse();
});
