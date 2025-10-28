import { getAbsensiTahfidzByKelasIdService } from "~~/server/modules/absensi-tahfidz";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { tahfidz: ["view"] });
  const id = OParam.parse(getRouterParam(event, "id"));

  const data = await getAbsensiTahfidzByKelasIdService(user.daerahId, id);

  return HttpResponse(data);
});
