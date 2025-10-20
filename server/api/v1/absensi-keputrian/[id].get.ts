import { getAbsensiKeputrianByKelasIdService } from "~~/server/modules/absensi-keputrian";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["view"] });
  const id = OParam.parse(getRouterParam(event, "id"));

  const data = await getAbsensiKeputrianByKelasIdService(user.daerahId, id);

  return HttpResponse(data);
});
