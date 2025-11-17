import { updateKelasKeputrianService } from "~~/server/modules/kelas-keputrian";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["manage"] });
  const id = OParam.parse(getRouterParam(event, "id"));

  const body = await readValidatedBody(event, (b) =>
    ONamaMudamudiTanggal.parse(b)
  );

  await updateKelasKeputrianService(id, user.daerahId!, body);

  return HttpResponse();
});
