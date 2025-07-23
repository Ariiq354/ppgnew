import { createAccessControl } from "better-auth/plugins/access";
import {
  defaultStatements,
  adminAc,
  userAc,
} from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  menu: ["user"],
  dokumen: ["upload", "download"],
  daerah: ["create", "update", "delete"],
  desa: ["create", "update", "delete"],
  kelompok: ["create", "update", "delete"],
} as const;

export type TStatement = {
  [key in keyof typeof statement]?: Array<
    (typeof statement)[key] extends readonly unknown[]
      ? (typeof statement)[key][number]
      : never
  >;
};

export const ac = createAccessControl(statement);

export const rolesDeclaration = {
  admin: ac.newRole({
    ...Object.fromEntries(
      Object.entries(statement).map(([key, value]) => [key, [...value]])
    ),
    ...adminAc.statements,
  }),

  user: ac.newRole({
    ...userAc.statements,
  }),

  daerah: ac.newRole({
    daerah: ["delete"],
    desa: ["create", "update", "delete"],
    kelompok: ["create", "update", "delete"],
  }),

  desa: ac.newRole({
    kelompok: ["create", "update", "delete"],
  }),
};

export const roles = [
  "sekretariat",
  "kurikulum",
  "tenaga_pendidik",
  "penggalang_dana",
  "sarana_prasarana",
  "kemandirian",
  "keputrian",
  "bimbingan_konseling",
  "olahraga_seni",
  "kegiatan_muda_mudi",
  "tahfidz",
  "media_publikasi",
  "karakter",
] as const;
