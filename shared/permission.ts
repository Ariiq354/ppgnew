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
} as const;

export type TStatement = {
  [key in keyof typeof statement]?: Array<
    (typeof statement)[key] extends readonly unknown[]
      ? (typeof statement)[key][number]
      : never
  >;
};

export const ac = createAccessControl(statement);

export const admin = ac.newRole({
  menu: [...statement.menu],
  dokumen: [...statement.dokumen],
  ...adminAc.statements,
});

export const user = ac.newRole({
  ...userAc.statements,
});

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
