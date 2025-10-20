import {
  createAbsensiPengurusService,
  OAbsensiPengurusCreate,
} from "~~/server/modules/absensi-pengurus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["manage"] });

  const res = await readValidatedBody(event, (body) =>
    OAbsensiPengurusCreate.parse(body)
  );

  await createAbsensiPengurusService(
    user.daerahId,
    res.musyawarahId,
    res.absen
  );

  return HttpResponse();
});
