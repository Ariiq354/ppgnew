import { OTahunBulanDesa } from "~~/server/modules/absensi-desa";
import { getAbsensiGenerusSummaryService } from "~~/server/modules/absensi-generus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const query = await getValidatedQuery(event, (q) => OTahunBulanDesa.parse(q));

  const dataPaud = await getAbsensiGenerusSummaryService(
    {
      desaId: user.desaId!,
      kelompokId: query.kelompokId,
    },
    { kelasPengajian: "PAUD" },
    query
  );
  const dataCabeRawit = await getAbsensiGenerusSummaryService(
    { desaId: user.desaId!, kelompokId: query.kelompokId },
    { kelasPengajian: "Cabe Rawit" },
    query
  );
  const dataPraremaja = await getAbsensiGenerusSummaryService(
    { desaId: user.desaId!, kelompokId: query.kelompokId },
    { kelasPengajian: "Praremaja" },
    query
  );
  const dataMudamudi = await getAbsensiGenerusSummaryService(
    { desaId: user.desaId!, kelompokId: query.kelompokId },
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
