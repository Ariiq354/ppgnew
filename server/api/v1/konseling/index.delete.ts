import { deleteKonseling } from "~~/server/services/konseling/konseling.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODeleteSchema.parse(b));

  await deleteKonseling(user.daerahId, user.kelompokId!, body.id);
  return HttpResponse();
});
