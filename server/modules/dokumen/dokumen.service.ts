// dokumen.service.ts

import type { TPagination } from "~~/server/utils/dto";
import {
  createDokumen,
  deleteDokumen,
  getAllDokumen,
  getDokumenById,
} from "./dokumen.repo";
import type { MultiPartData } from "h3";
import Env from "~~/shared/env";
import { ODokumenCreate } from "./dokumen.dto";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function getAllDokumenService(
  daerahId: number,
  query: TPagination
) {
  const data = await getAllDokumen(daerahId, query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return {
    data: data.data,
    metadata,
  };
}

export async function createDokumenService(
  daerahId: number,
  result: MultiPartData[] | undefined
) {
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

  await createDokumen(daerahId, parsed);
}

export async function deleteDokumenService(daerahId: number, ids: number[]) {
  for (const id of ids) {
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

  await deleteDokumen(daerahId, ids);
}
