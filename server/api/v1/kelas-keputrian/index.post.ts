import { createKelasKeputrianService } from "~~/server/modules/kelas-keputrian";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["manage"] });

  const body = await readValidatedBody(event, (b) => ONamaTanggal.parse(b));

  await createKelasKeputrianService(user.daerahId, body);

  return HttpResponse();
});
