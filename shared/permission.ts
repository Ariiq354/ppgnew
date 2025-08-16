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
  proker: ["create", "view", "update", "delete"],
  desa_menu: ["view", "create", "update", "delete"],
  kelompok_menu: ["view", "create", "update", "delete"],
  sekretariat: ["view", "create", "update", "delete"],
  bidang_menu_view: [
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
  ],
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
    proker: ["create", "update", "delete"],
    sekretariat: ["create", "update", "delete", "view"],
    bidang_menu_view: ["sekretariat"],
  }),
  kurikulum: ac.newRole({
    proker: ["view", "create", "update", "delete"],
    bidang_menu_view: ["kurikulum"],
  }),
  tenaga_pendidik: ac.newRole({
    proker: ["view", "create", "update", "delete"],
    bidang_menu_view: ["tenaga_pendidik"],
  }),
  penggalang_dana: ac.newRole({
    proker: ["view", "create", "update", "delete"],
    bidang_menu_view: ["penggalang_dana"],
  }),
  sarana_prasarana: ac.newRole({
    proker: ["view", "create", "update", "delete"],
    bidang_menu_view: ["sarana_prasarana"],
  }),
  kemandirian: ac.newRole({
    proker: ["view", "create", "update", "delete"],
    bidang_menu_view: ["kemandirian"],
  }),
  keputrian: ac.newRole({
    proker: ["view", "create", "update", "delete"],
    bidang_menu_view: ["keputrian"],
  }),
  bimbingan_konseling: ac.newRole({
    proker: ["view", "create", "update", "delete"],
    bidang_menu_view: ["bimbingan_konseling"],
  }),
  olahraga_seni: ac.newRole({
    proker: ["view", "create", "update", "delete"],
    bidang_menu_view: ["olahraga_seni"],
  }),
  kegiatan_muda_mudi: ac.newRole({
    proker: ["view", "create", "update", "delete"],
    bidang_menu_view: ["kegiatan_muda_mudi"],
  }),
  tahfidz: ac.newRole({
    proker: ["view", "create", "update", "delete"],
    bidang_menu_view: ["tahfidz"],
  }),
  media_publikasi: ac.newRole({
    proker: ["view", "create", "update", "delete"],
    bidang_menu_view: ["media_publikasi"],
  }),
  karakter: ac.newRole({
    proker: ["view", "create", "update", "delete"],
    bidang_menu_view: ["karakter"],
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
