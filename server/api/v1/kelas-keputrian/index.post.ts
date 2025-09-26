import { createKelasKeputrian } from "~~/server/repository/kelas-keputrian.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["manage"] });

  const body = await readValidatedBody(event, (b) => ONamaTanggal.parse(b));

  await createKelasKeputrian(user.daerahId, body);

  return HttpResponse();
});
