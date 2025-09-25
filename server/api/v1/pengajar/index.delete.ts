import {
  deletePengajar,
  getPengajarById,
} from "~~/server/services/pengajar/pengajar.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  for (const id of body.id) {
    const data = await getPengajarById(user.kelompokId!, id);
    if (!data) {
      throw createError({
        statusCode: 400,
        message: "Item not found",
      });
    }

    if (data.foto) {
      const publicId = getPublicIdFromUrl(data.foto);
      await deleteCloudinary(publicId, "image");
    }
  }

  await deletePengajar(user.kelompokId!, body.id);
  return HttpResponse();
});
