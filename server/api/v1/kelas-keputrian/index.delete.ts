import { deleteKelasKeputrianService } from "~~/server/modules/kelas-keputrian";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deleteKelasKeputrianService(user.daerahId, body.id);
  return HttpResponse();
});
