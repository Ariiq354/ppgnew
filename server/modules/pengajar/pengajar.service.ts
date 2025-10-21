import { OPengajarCreate, type TPengajarList } from "./pengajar.dto";
import {
  createPengajar,
  deletePengajar,
  getAllPengajar,
  getAllPengajarChart,
  getAllPengajarExport,
  getAllPengajarExportDesa,
  getCountPengajar,
  getPengajarById,
  updatePengajar,
} from "./pengajar.repo";
import ENV from "~~/shared/env";
import type { MultiPartData } from "h3";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function getAllPengajarService(
  daerahId: number,
  query: TPengajarList
) {
  const { data, total } = await getAllPengajar(daerahId, query);

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total,
    totalPage: Math.ceil(total / query.limit),
  };
  return { data, metadata };
}

export async function getAllPengajarExportService(daerahId: number) {
  return await getAllPengajarExport(daerahId);
}

export async function getAllPengajarExportDesaService(desaId: number) {
  return await getAllPengajarExportDesa(desaId);
}

export async function getCountPengajarService(
  daerahId: number,
  desaId?: number,
  kelompokId?: number
) {
  return getCountPengajar(daerahId, desaId, kelompokId);
}

export async function getAllPengajarChartService(
  daerahId: number,
  desaId?: number,
  kelompokId?: number
) {
  return getAllPengajarChart(daerahId, desaId, kelompokId);
}

export async function createPengajarService(
  user: UserWithId,
  formData: MultiPartData[] | undefined
) {
  if (!formData) {
    throw createError({
      statusCode: 400,
      message: "No multipart data found",
    });
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
        ENV.PENGAJAR_PRESET,
        part.data,
        "image"
      );

      fields["foto"] = uploadResult.secure_url;
    } else {
      fields[part.name as string] = part.data.toString();
    }
  }

  const parsed = OPengajarCreate.parse(fields);

  await createPengajar(
    {
      daerahId: user.daerahId,
      desaId: user.desaId!,
      kelompokId: user.kelompokId!,
    },
    parsed
  );
}

export async function deletePengajarService(user: UserWithId, body: TDelete) {
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
}

export async function updatePengajarService(
  id: number,
  user: UserWithId,
  formData: MultiPartData[] | undefined
) {
  if (!formData) {
    throw createError({
      statusCode: 400,
      message: "No multipart data found",
    });
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
        ENV.PENGAJAR_PRESET,
        part.data,
        "image"
      );

      fields["file"] = uploadResult.secure_url;
    } else {
      fields[part.name as string] = part.data.toString();
    }
  }

  const parsed = OPengajarCreate.parse(fields);

  if (fields["file"]) {
    if (parsed.foto) {
      const publicId = getPublicIdFromUrl(parsed.foto);
      await deleteCloudinary(publicId, "image");
    }
    parsed.foto = fields["file"];
  }

  await updatePengajar(id, user.kelompokId!, parsed);
}
