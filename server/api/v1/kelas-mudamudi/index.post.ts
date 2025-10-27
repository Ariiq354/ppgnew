import { createKelasMudamudiService } from "~~/server/modules/kelas-mudamudi";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kegiatan_muda_mudi: ["manage"] });

  const body = await readValidatedBody(event, (b) => ONamaTanggal.parse(b));

  await createKelasMudamudiService(user.daerahId, body);

  return HttpResponse();
});
