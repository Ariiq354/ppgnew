import { updateKelasMudamudiService } from "~~/server/modules/kelas-mudamudi";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kegiatan_muda_mudi: ["manage"] });
  const id = OParam.parse(getRouterParam(event, "id"));

  const body = await readValidatedBody(event, (b) =>
    ONamaMudamudiTanggal.parse(b)
  );

  await updateKelasMudamudiService(id, user.daerahId!, body);

  return HttpResponse();
});
