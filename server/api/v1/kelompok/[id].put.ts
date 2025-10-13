import { z } from "zod/mini";
import {
  OKelompokCreate,
  updateKelompokService,
} from "~~/server/modules/kelompok";

const paramsSchema = z.coerce.number();

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const result = await readValidatedBody(event, (b) =>
    OKelompokCreate.parse(b)
  );
  const id = paramsSchema.parse(getRouterParam(event, "id"));

  await updateKelompokService(id, result);

  return HttpResponse();
});
