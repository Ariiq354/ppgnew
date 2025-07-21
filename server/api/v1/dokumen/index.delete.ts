import {
  deleteDokumen,
  getDokumenById,
} from "~~/server/services/dokumen/dokumen.service";

export default defineEventHandler(async (event) => {
  adminGuard(event);
  const query = await readValidatedBody(event, (query) =>
    ODeleteSchema.parse(query)
  );

  for (const id of query.id) {
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

  await deleteDokumen(query.id);
  return HttpResponse();
});
