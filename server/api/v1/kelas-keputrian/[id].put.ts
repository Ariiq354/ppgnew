import { z } from "zod/mini";
import { updateKelasKeputrian } from "~~/server/services/kelas-keputrian/kelas-keputrian.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["manage"] });
  const id = getRouterParam(event, "id");
  const parsed = z.coerce.number().parse(id);

  const body = await readValidatedBody(event, (b) => ONamaTanggal.parse(b));

  await updateKelasKeputrian(parsed, user.daerahId!, body);

  return HttpResponse();
});
