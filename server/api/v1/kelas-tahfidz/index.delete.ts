import { deleteKelasTahfidzService } from "~~/server/modules/kelas-tahfidz";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { tahfidz: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deleteKelasTahfidzService(user.daerahId, body.id);
  return HttpResponse();
});
