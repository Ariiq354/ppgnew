import {
  createAbsensiJamaahService,
  OAbsensiJamaahCreate,
} from "~~/server/modules/absensi-jamaah";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });

  const res = await readValidatedBody(event, (body) =>
    OAbsensiJamaahCreate.parse(body)
  );

  await createAbsensiJamaahService(
    user.kelompokId!,
    res.pengajianId,
    res.absen
  );

  return HttpResponse();
});
