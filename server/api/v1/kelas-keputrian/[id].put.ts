import { z } from "zod/mini";
import { OKelasKeputrianCreate } from "~~/server/services/kelas-keputrian/dto/kelas-keputrian.dto";
import { updateKelasKeputrian } from "~~/server/services/kelas-keputrian/kelas-keputrian.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["manage"] });
  const id = getRouterParam(event, "id");
  const parsed = z.coerce.number().parse(id);

  const body = await readValidatedBody(event, (b) =>
    OKelasKeputrianCreate.parse(b)
  );

  await updateKelasKeputrian(parsed, user.daerahId!, body);

  return HttpResponse();
});
