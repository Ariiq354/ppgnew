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
  sekretariat: ["view", "create", "update", "delete"],
  kurikulum: ["view", "create", "update", "delete"],
  tenaga_pendidik: ["view", "create", "update", "delete"],
  penggalang_dana: ["view", "create", "update", "delete"],
  sarana_prasarana: ["view", "create", "update", "delete"],
  kemandirian: ["view", "create", "update", "delete"],
  keputrian: ["view", "create", "update", "delete"],
  bimbingan_konseling: ["view", "create", "update", "delete"],
  olahraga_seni: ["view", "create", "update", "delete"],
  kegiatan_muda_mudi: ["view", "create", "update", "delete"],
  tahfidz: ["view", "create", "update", "delete"],
  media_publikasi: ["view", "create", "update", "delete"],
  karakter: ["view", "create", "update", "delete"],
  desa_menu: ["view", "create", "update", "delete"],
  kelompok_menu: ["view", "create", "update", "delete"],
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
  sekretariat: ac.newRole({
    sekretariat: ["view", "create", "update", "delete"],
  }),
  kurikulum: ac.newRole({
    kurikulum: ["view", "create", "update", "delete"],
  }),
  tenaga_pendidik: ac.newRole({
    tenaga_pendidik: ["view", "create", "update", "delete"],
  }),
  penggalang_dana: ac.newRole({
    penggalang_dana: ["view", "create", "update", "delete"],
  }),
  sarana_prasarana: ac.newRole({
    sarana_prasarana: ["view", "create", "update", "delete"],
  }),
  kemandirian: ac.newRole({
    kemandirian: ["view", "create", "update", "delete"],
  }),
  keputrian: ac.newRole({
    keputrian: ["view", "create", "update", "delete"],
  }),
  bimbingan_konseling: ac.newRole({
    bimbingan_konseling: ["view", "create", "update", "delete"],
  }),
  olahraga_seni: ac.newRole({
    olahraga_seni: ["view", "create", "update", "delete"],
  }),
  kegiatan_muda_mudi: ac.newRole({
    kegiatan_muda_mudi: ["view", "create", "update", "delete"],
  }),
  tahfidz: ac.newRole({
    tahfidz: ["view", "create", "update", "delete"],
  }),
  media_publikasi: ac.newRole({
    media_publikasi: ["view", "create", "update", "delete"],
  }),
  karakter: ac.newRole({
    karakter: ["view", "create", "update", "delete"],
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
