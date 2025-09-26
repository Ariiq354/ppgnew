import { updateKelasKeputrian } from "~~/server/repository/kelas-keputrian.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["manage"] });
  const id = OParam.parse(getRouterParam(event, "id"));

  const body = await readValidatedBody(event, (b) => ONamaTanggal.parse(b));

  await updateKelasKeputrian(id, user.daerahId!, body);

  return HttpResponse();
});
