import {
  deleteDokumen,
  getDokumenById,
} from "~~/server/services/dokumen/dokumen.service";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const body = await readValidatedBody(event, (b) => ODelete.parse(b));

  for (const id of body.id) {
    const data = await getDokumenById(id);
    if (!data) {
      throw createError({
        statusCode: 400,
        message: "Item not found",
      });
    }

    const publicId = getPublicIdFromUrl(data.url);
    await deleteCloudinary(publicId, "raw");
  }

  await deleteDokumen(body.id);
  return HttpResponse();
});
