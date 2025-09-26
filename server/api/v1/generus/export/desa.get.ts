import { getAllGenerusExportDesa } from "~~/server/repository/generus.repo";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_desa: ["view"] });

  const data = await getAllGenerusExportDesa(user.desaId!);

  const newData = data.map(({ tanggalMasukKelas, ...rest }) => ({
    ...rest,
    kelasSekolah: getCurrentKelas(rest.kelasSekolah, tanggalMasukKelas),
  }));

  return exportToXlsx(event, "generus", newData);
});
