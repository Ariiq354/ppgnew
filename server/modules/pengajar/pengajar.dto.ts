import { z } from "zod/mini";
import { OPagination } from "~~/server/utils/dto/common.dto";
import { genderEnum, statusPengajarEnum } from "~~/shared/enum";

export const OPengajarCreate = z.object({
  nama: z.string(),
  tempatLahir: z.string(),
  tanggalLahir: z.iso.date(),
  pendidikan: z.string(),
  status: z.enum(statusPengajarEnum),
  gender: z.enum(genderEnum),
  tanggalTugas: z.iso.date(),
  noTelepon: z.string(),
  foto: z.string(),
});

export type TPengajarCreate = z.infer<typeof OPengajarCreate>;

export const OPengajarList = z.object({
  ...OPagination.def.shape,
  search: z.optional(z.string()),
  status: z.optional(z.enum(statusPengajarEnum)),
  desaId: z.optional(z.coerce.number()),
  kelompokId: z.optional(z.coerce.number()),
});

export type TPengajarList = z.infer<typeof OPengajarList>;
