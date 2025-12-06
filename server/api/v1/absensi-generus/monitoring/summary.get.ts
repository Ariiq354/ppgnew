import { getAbsensiGenerusSummaryService } from "~~/server/modules/absensi-generus";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["view"] });

  const dataPaud = await getAbsensiGenerusSummaryService(
    { kelompokId: user.kelompokId! },
    { kelasPengajian: "PAUD" }
  );
  const dataCabeRawit = await getAbsensiGenerusSummaryService(
    { kelompokId: user.kelompokId! },
    { kelasPengajian: "Cabe Rawit" }
  );
  const dataPraremaja = await getAbsensiGenerusSummaryService(
    { kelompokId: user.kelompokId! },
    { kelasPengajian: "Praremaja" }
  );
  const dataMudamudi = await getAbsensiGenerusSummaryService(
    { kelompokId: user.kelompokId! },
    { kelasPengajian: "Muda-mudi" }
  );

  const data = {
    dataPaud,
    dataCabeRawit,
    dataPraremaja,
    dataMudamudi,
  };

  return HttpResponse(data);
});
