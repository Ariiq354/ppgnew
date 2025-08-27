import { OMuslimunCreate } from "~~/server/services/muslimun/dto/muslimun.dto";
import { createMuslimun } from "~~/server/services/muslimun/muslimun.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });

  const body = await readValidatedBody(event, (b) => OMuslimunCreate.parse(b));

  await createMuslimun(user.kelompokId!, body);

  return HttpResponse();
});
