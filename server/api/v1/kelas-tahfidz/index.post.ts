import { createKelasTahfidzService } from "~~/server/modules/kelas-tahfidz";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { tahfidz: ["manage"] });

  const body = await readValidatedBody(event, (b) => ONamaTanggal.parse(b));

  await createKelasTahfidzService(user.daerahId, body);

  return HttpResponse();
});
