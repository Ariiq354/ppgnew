import { deleteKelasMudamudiService } from "~~/server/modules/kelas-mudamudi";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { kegiatan_muda_mudi: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  await deleteKelasMudamudiService(user.daerahId, body.id);
  return HttpResponse();
});
