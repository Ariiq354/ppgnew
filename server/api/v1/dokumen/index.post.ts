import { createDokumen } from "~~/server/services/dokumen/dokumen.service";
import { ODokumenCreate } from "~~/server/services/dokumen/dokumen.dto";
import { uploadCloudinary } from "~~/server/utils/cloudinary";
import Env from "~~/shared/env";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default defineEventHandler(async (event) => {
  const user = authGuard(event);

  const result = await readMultipartFormData(event);

  if (!result) {
    throw createError({
      statusCode: 400,
      message: "No multipart data found",
    });
  }

  if (result.length > 1) {
    throw createError({
      statusCode: 400,
      message: "Only one value is allowed",
    });
  }

  if (!result[0]!.filename) {
    throw createError({
      statusCode: 400,
      message: "Only file is allowed",
    });
  }

  const fields: Record<string, string> = {};

  const part = result[0]!;

  if (part.data.length > MAX_FILE_SIZE) {
    throw createError({
      statusCode: 400,
      message: "File is too large. Maximum 5MB allowed.",
    });
  }

  const uploadResult = await uploadCloudinary(
    Env.DOKUMEN_PRESET,
    part.data,
    "raw"
  );

  fields["url"] = uploadResult.secure_url;
  fields["name"] = part.filename!;
  fields["size"] = uploadResult.bytes.toString();
  fields["type"] = part.type!;

  const parsed = ODokumenCreate.parse(fields);

  await createDokumen(user.daerahId, parsed);

  return HttpResponse(fields);
});
