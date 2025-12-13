import { getAbsensiGenerusSummaryService } from "~~/server/modules/absensi-generus";
import { OTahunBulan } from "~~/server/utils/dto/absensi.dto";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const query = await getValidatedQuery(event, (q) =>
    OTahunBulan.parse(q)
  );

  const dataPaud = await getAbsensiGenerusSummaryService(
    { kelompokId: user.kelompokId! },
    { kelasPengajian: "PAUD" },
    query
  );
  const dataCabeRawit = await getAbsensiGenerusSummaryService(
    { kelompokId: user.kelompokId! },
    { kelasPengajian: "Cabe Rawit" },
    query
  );
  const dataPraremaja = await getAbsensiGenerusSummaryService(
    { kelompokId: user.kelompokId! },
    { kelasPengajian: "Praremaja" },
    query
  );
  const dataMudamudi = await getAbsensiGenerusSummaryService(
    { kelompokId: user.kelompokId! },
    { kelasPengajian: "Muda-mudi" },
    query
  );

  const data = {
    dataPaud,
    dataCabeRawit,
    dataPraremaja,
    dataMudamudi,
  };

  return HttpResponse(data);
});
