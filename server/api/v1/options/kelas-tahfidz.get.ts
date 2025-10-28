import { getAllKelasTahfidzOptionsService } from "~~/server/modules/kelas-tahfidz";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { tahfidz: ["view"] });

  const data = await getAllKelasTahfidzOptionsService(user.daerahId);

  return HttpResponse(data.data);
});
