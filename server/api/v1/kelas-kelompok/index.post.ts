import { createKelasService } from "~~/server/modules/kelas-kelompok";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });

  const body = await readValidatedBody(event, (b) =>
    ONamaGenerusTanggal.parse(b)
  );

  await createKelasService(user.kelompokId!, body);

  return HttpResponse();
});
