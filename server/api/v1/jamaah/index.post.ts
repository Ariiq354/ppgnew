import { OJamaahCreate } from "~~/server/api/v1/jamaah/_dto";
import { createJamaah } from "~~/server/repository/jamaah.repo";

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
