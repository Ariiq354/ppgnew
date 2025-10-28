import { createAbsensiTahfidzService } from "~~/server/modules/absensi-tahfidz";
import { OAbsensiGenerusCreate } from "~~/server/utils/dto";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { tahfidz: ["manage"] });

  const res = await readValidatedBody(event, (body) =>
    OAbsensiGenerusCreate.parse(body)
  );

  await createAbsensiTahfidzService(user.daerahId, res.kelasId, res.absen);

  return HttpResponse();
});
