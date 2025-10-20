import { createAbsensiKeputrianService } from "~~/server/modules/absensi-keputrian";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["manage"] });

  const res = await readValidatedBody(event, (body) =>
    OAbsensiGenerusCreate.parse(body)
  );

  await createAbsensiKeputrianService(user.daerahId, res.kelasId, res.absen);

  return HttpResponse();
});
