import { createAbsensiGpsService } from "~~/server/modules/absensi-gps";
import { OAbsensiGenerusCreate } from "~~/server/utils/dto";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["manage"] });

  const res = await readValidatedBody(event, (body) =>
    OAbsensiGenerusCreate.parse(body)
  );

  await createAbsensiGpsService(user.desaId!, res.kelasId, res.absen);

  return HttpResponse();
});
