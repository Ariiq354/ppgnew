import { getAllKelasService } from "~~/server/modules/kelas-kelompok";
import { OKegiatanWithNama } from "~~/server/utils/dto";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OKegiatanWithNama.parse(q)
  );

  const data = await getAllKelasService(user.kelompokId!, query);

  return HttpResponse(data.data, data.metadata);
});
