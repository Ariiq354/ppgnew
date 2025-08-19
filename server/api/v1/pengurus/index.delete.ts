import {
  deletePengurus,
  getPengurusById,
} from "~~/server/services/pengurus/pengurus.service";

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { sekretariat: ["delete"] });
  const body = await readValidatedBody(event, (b) => ODeleteSchema.parse(b));

  for (const id of body.id) {
    const data = await getPengurusById(user.daerahId, id);
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

  await deletePengurus(user.daerahId, body.id);
  return HttpResponse();
});
