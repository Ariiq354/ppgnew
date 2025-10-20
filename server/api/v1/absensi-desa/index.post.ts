import { createAbsensiDesaService } from "~~/server/modules/absensi-desa";
import { OAbsensiGenerusCreate } from "~~/server/utils/dto";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["manage"] });

  const res = await readValidatedBody(event, (body) =>
    OAbsensiGenerusCreate.parse(body)
  );

  await createAbsensiDesaService(user.desaId!, res.kelasId, res.absen);

  return HttpResponse();
});
