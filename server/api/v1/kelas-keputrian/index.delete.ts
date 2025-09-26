import { deleteKelasKeputrian } from "~~/server/repository/kelas-keputrian.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deleteKelasKeputrian(user.daerahId, body.id);
  return HttpResponse();
});
