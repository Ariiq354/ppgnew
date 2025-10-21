import { getAbsensiPengurusByMusyawarahIdService } from "~~/server/modules/absensi-pengurus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["view"] });
  const id = OParam.parse(getRouterParam(event, "id"));

  const data = await getAbsensiPengurusByMusyawarahIdService(user.daerahId, id);

  return HttpResponse(data);
});
