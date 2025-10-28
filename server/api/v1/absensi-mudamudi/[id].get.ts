import { getAbsensiMudamudiByKelasIdService } from "~~/server/modules/absensi-mudamudi";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kegiatan_muda_mudi: ["view"] });
  const id = OParam.parse(getRouterParam(event, "id"));

  const data = await getAbsensiMudamudiByKelasIdService(user.daerahId, id);

  return HttpResponse(data);
});
