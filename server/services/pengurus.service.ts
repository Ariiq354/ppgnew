import type { MultiPartData } from "h3";
import { OPengurusCreate } from "~~/server/api/v1/pengurus/_dto";
import {
  createPengurus,
  deletePengurus,
  getPengurusById,
  updatePengurus,
} from "~~/server/repository/pengurus.repo";
import ENV from "~~/shared/env";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function createPengurusWithUpload(
  user: UserWithId,
  formData: MultiPartData[] | undefined
) {
  if (!formData) {
    throw createError({ statusCode: 400, message: "No multipart data found" });
  }

  const fields: Record<string, string> = {};

  for (const part of formData) {
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
        ENV.PENGURUS_PRESET,
        part.data,
        "image"
      );

      fields["foto"] = uploadResult.secure_url;
    } else {
      fields[part.name as string] = part.data.toString();
    }
  }

  const parsed = OPengurusCreate.parse(fields);

  await createPengurus(user.daerahId, parsed);
}

export async function deletePengurusService(user: UserWithId, body: TDelete) {
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
}

export async function updatePengurusWithUpload(
  id: number,
  user: UserWithId,
  formData: MultiPartData[] | undefined
) {
  if (!formData) {
    throw createError({ statusCode: 400, message: "No multipart data found" });
  }

  const fields: Record<string, string> = {};

  for (const part of formData) {
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
        ENV.PENGURUS_PRESET,
        part.data,
        "image"
      );

      fields["foto"] = uploadResult.secure_url;
    } else {
      fields[part.name as string] = part.data.toString();
    }
  }

  const parsed = OPengurusCreate.parse(fields);

  if (fields["file"]) {
    if (parsed.foto) {
      const publicId = getPublicIdFromUrl(parsed.foto);
      await deleteCloudinary(publicId, "image");
    }
    parsed.foto = fields["file"];
  }

  await updatePengurus(id, user.daerahId, parsed);
}
