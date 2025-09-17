import { OPengajianCreate } from "~~/server/services/pengajian/dto/pengajian.dto";
import { createPengajian } from "~~/server/services/pengajian/pengajian.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });

  const body = await readValidatedBody(event, (b) => OPengajianCreate.parse(b));

  await createPengajian(user.kelompokId!, body);

  return HttpResponse();
});
