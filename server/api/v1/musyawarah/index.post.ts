import { OMusyawarahCreate } from "~~/server/services/musyawarah/dto/musyawarah.dto";
import { createMusyawarah } from "~~/server/services/musyawarah/musyawarah.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["manage"] });

  const body = await readValidatedBody(event, (b) =>
    OMusyawarahCreate.parse(b)
  );

  await createMusyawarah(user.daerahId, body);

  return HttpResponse();
});
