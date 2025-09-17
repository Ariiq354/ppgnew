import { z } from "zod/mini";
import { OPengajianCreate } from "~~/server/services/pengajian/dto/pengajian.dto";
import { updatePengajian } from "~~/server/services/pengajian/pengajian.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });
  const id = getRouterParam(event, "id");
  const parsed = z.coerce.number().parse(id);

  const body = await readValidatedBody(event, (b) => OPengajianCreate.parse(b));

  await updatePengajian(parsed, user.kelompokId!, body);

  return HttpResponse();
});
