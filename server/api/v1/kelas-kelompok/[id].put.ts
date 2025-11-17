import { updateKelasService } from "~~/server/modules/kelas-kelompok";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });
  const id = OParam.parse(getRouterParam(event, "id"));

  const body = await readValidatedBody(event, (b) =>
    ONamaGenerusTanggal.parse(b)
  );

  await updateKelasService(id, user.kelompokId!, body);

  return HttpResponse();
});
