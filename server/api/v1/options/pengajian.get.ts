import { getAllPengajianOptions } from "~~/server/services/pengajian/pengajian.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const data = await getAllPengajianOptions(user.kelompokId!);

  return HttpResponse(data.data);
});
