import { OKelasKeputrianCreate } from "~~/server/services/kelas-keputrian/dto/kelas-keputrian.dto";
import { createKelasKeputrian } from "~~/server/services/kelas-keputrian/kelas-keputrian.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { keputrian: ["manage"] });

  const body = await readValidatedBody(event, (b) =>
    OKelasKeputrianCreate.parse(b)
  );

  await createKelasKeputrian(user.daerahId, body);

  return HttpResponse();
});
