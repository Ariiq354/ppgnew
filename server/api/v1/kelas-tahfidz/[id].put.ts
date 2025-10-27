import { updateKelasTahfidzService } from "~~/server/modules/kelas-tahfidz";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { tahfidz: ["manage"] });
  const id = OParam.parse(getRouterParam(event, "id"));

  const body = await readValidatedBody(event, (b) => ONamaTanggal.parse(b));

  await updateKelasTahfidzService(id, user.daerahId!, body);

  return HttpResponse();
});
