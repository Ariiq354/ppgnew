import { z } from "zod/mini";
import { updateGenerus } from "~~/server/services/generus/generus.service";
import { OGenerusCreate } from "~~/server/services/generus/dto/generus.dto";
import ENV from "~~/shared/env";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const paramsSchema = z.coerce.number();

export default defineEventHandler(async (event) => {
  const user = await permissionGuard(event, { pjp_kelompok: ["manage"] });

  const result = await readMultipartFormData(event);
  const id = paramsSchema.parse(getRouterParam(event, "id"));

  if (!result) {
    throw createError({
      statusCode: 400,
      message: "No multipart data found",
    });
  }

  const fields: Record<string, string | string[]> = {};

  for (const part of result) {
    if (part.filename) {
      if (!ALLOWED_TYPES.includes(part.type || "")) {
        throw createError({
          statusCode: 400,
          message: "Invalid file type. Only JPG, PNG, WEBP allowed.",
        });
      }

      if (part.data.length > MAX_FILE_SIZE) {
        throw createError({
          statusCode: 400,
          message: "File is too large. Maximum 5MB allowed.",
        });
      }

      const uploadResult = await uploadCloudinary(
        ENV.GENERUS_PRESET,
        part.data,
        "image"
      );

      fields["file"] = uploadResult.secure_url;
    } else {
      const key = part.name as string;
      const value = part.data.toString();

      if (fields[key]) {
        if (Array.isArray(fields[key])) {
          (fields[key] as string[]).push(value);
        } else {
          fields[key] = [fields[key] as string, value];
        }
      } else {
        fields[key] = value;
      }
    }
  }

  const parsed = OGenerusCreate.parse(fields);

  if (fields["file"]) {
    if (parsed.foto) {
      const publicId = getPublicIdFromUrl(parsed.foto);
      await deleteCloudinary(publicId, "image");
    }
    parsed.foto = fields["file"] as string;
  }

  await updateGenerus(id, user.kelompokId!, parsed);

  return HttpResponse();
});
