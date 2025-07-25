import { getDesaByDaerahId } from "~~/server/services/desa/desa.service";
import { getKelompokByDaerahId } from "~~/server/services/kelompok/kelompok.service";

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const kelompok = await getKelompokByDaerahId(user.daerahId);
  const desa = await getDesaByDaerahId(user.daerahId);

  const data = {
    kelompok,
    desa,
  };

  return HttpResponse(data);
});
