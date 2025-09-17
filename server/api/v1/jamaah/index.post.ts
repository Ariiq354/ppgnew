import { OJamaahCreate } from "~~/server/services/jamaah/dto/jamaah.dto";
import { createJamaah } from "~~/server/services/jamaah/jamaah.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });

  const body = await readValidatedBody(event, (b) => OJamaahCreate.parse(b));

  await createJamaah(
    {
      daerahId: user.daerahId,
      desaId: user.desaId!,
      kelompokId: user.kelompokId!,
    },
    body
  );

  return HttpResponse();
});
