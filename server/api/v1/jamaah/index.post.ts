import { createJamaahService, OJamaahCreate } from "~~/server/modules/jamaah";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });

  const body = await readValidatedBody(event, (b) => OJamaahCreate.parse(b));

  await createJamaahService(
    {
      daerahId: user.daerahId,
      desaId: user.desaId!,
      kelompokId: user.kelompokId!,
    },
    body
  );

  return HttpResponse();
});
