import { getAllPengajianOptionsService } from "~~/server/modules/pengajian";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const data = await getAllPengajianOptionsService(user.kelompokId!);

  return HttpResponse(data.data);
});
