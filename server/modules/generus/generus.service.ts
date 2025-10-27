import type { MultiPartData } from "h3";
import type { TGenerusList } from "~~/server/utils/dto";
import ENV from "~~/shared/env";
import { OGenerusCreate } from "./generus.dto";
import {
  createGenerus,
  deleteGenerus,
  getAllGenerus,
  getAllGenerus69,
  getAllGenerusChart,
  getAllGenerusExport,
  getAllGenerusExportDesa,
  getCountGenerus,
  getGenerusById,
  getGenerusOptionsKelompok,
  updateGenerus,
} from "./generus.repo";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function getAllGenerusService(
  daerahId: number,
  query: TGenerusList
) {
  const data = await getAllGenerus(daerahId, query);

  const newData = data.data.map(({ tanggalMasukKelas, ...rest }) => ({
    ...rest,
    kelasSekolah: getCurrentKelas(rest.kelasSekolah, tanggalMasukKelas),
  }));

  const metadata = {
    page: query.page,
    itemPerPage: query.limit,
    total: data.total,
    totalPage: Math.ceil(data.total / query.limit),
  };

  return {
    data: newData,
    metadata,
  };
}

export async function getAllGenerusExportDesaService(desaId: number) {
  const data = await getAllGenerusExportDesa(desaId);

  const newData = data.map(({ tanggalMasukKelas, ...rest }) => ({
    ...rest,
    kelasSekolah: getCurrentKelas(rest.kelasSekolah, tanggalMasukKelas),
  }));

  return newData;
}

export async function getAllGenerusExportService(kelompokId: number) {
  const data = await getAllGenerusExport(kelompokId);

  const newData = data.map(({ tanggalMasukKelas, ...rest }) => ({
    ...rest,
    kelasSekolah: getCurrentKelas(rest.kelasSekolah, tanggalMasukKelas),
  }));

  return newData;
}

export async function getCountGenerusService(
  daerahId: number,
  desaId?: number,
  kelompokId?: number
) {
  return getCountGenerus(daerahId, desaId, kelompokId);
}

export async function getAllGenerusChartService(
  daerahId: number,
  desaId?: number,
  kelompokId?: number
) {
  return getAllGenerusChart(daerahId, desaId, kelompokId);
}

export async function getAllGenerus69Service(daerahId: number) {
  return getAllGenerus69(daerahId);
}

export async function createGenerusService(
  user: UserWithId,
  formData: MultiPartData[] | undefined
) {
  if (!formData) {
    throw createError({
      statusCode: 400,
      message: "No multipart data found",
    });
  }

  const fields: Record<string, string | string[]> = {};

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
        ENV.GENERUS_PRESET,
        part.data,
        "image"
      );

      fields["foto"] = uploadResult.secure_url;
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

  await createGenerus(
    {
      daerahId: user.daerahId,
      desaId: user.desaId!,
      kelompokId: user.kelompokId!,
    },
    parsed
  );
}

export async function deleteGenerusService(user: UserWithId, body: TDelete) {
  for (const id of body.id) {
    const data = await getGenerusById(user.kelompokId!, id);
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

  await deleteGenerus(user.kelompokId!, body.id);
}

export async function updateGenerusService(
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

  const fields: Record<string, string | string[]> = {};

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
        ENV.GENERUS_PRESET,
        part.data,
        "image"
      );

      fields["file"] = uploadResult.secure_url;
    } else {
      let key = part.name as string;
      let value = part.data.toString();

      const isArrayKey = key.endsWith("[]");
      if (isArrayKey) {
        key = key.slice(0, -2);
        value = JSON.parse(value);
      }

      fields[key] = value;
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
}

export async function getGenerusOptionsKelompokService(kelompokId: number) {
  return getGenerusOptionsKelompok(kelompokId);
}
