import { createAbsensiGenerusService } from "~~/server/modules/absensi-generus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });

  const res = await readValidatedBody(event, (body) =>
    OAbsensiGenerusCreate.parse(body)
  );

  await createAbsensiGenerusService(user.kelompokId!, res.kelasId, res.absen);

  return HttpResponse();
});
