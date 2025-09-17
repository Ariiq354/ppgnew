import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  menu: ["daftar-user"],
  dokumen: ["upload", "download"],
  daerah: ["manage"],
  desa: ["manage"],
  kelompok: ["manage"],
  proker: ["view", "manage"],
  musyawarah_bidang: ["view", "manage"],
  musyawarah_ppg: ["view", "manage"],
  pjp_desa: ["view", "manage"],
  pjp_kelompok: ["view", "manage"],
  bimbingan_konseling: ["view", "manage"],
  kegiatan_muda_mudi: ["view", "manage"],
  kemandirian: ["view", "manage"],
  keputrian: ["view", "manage"],
  kurikulum: ["view", "manage"],
  media_publikasi: ["view", "manage"],
  olahraga_seni: ["view", "manage"],
  penggalang_dana: ["view", "manage"],
  sarana_prasarana: ["view", "manage"],
  sekretariat: ["view", "manage"],
  tahfidz: ["view", "manage"],
  tenaga_pendidik: ["view", "manage"],
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

  daerah: ac.newRole({
    proker: ["view"],
    musyawarah_bidang: ["view"],
    musyawarah_ppg: ["view"],
    sekretariat: ["view"],
    kurikulum: ["view"],
    tenaga_pendidik: ["view"],
    penggalang_dana: ["view"],
    sarana_prasarana: ["view"],
    kemandirian: ["view"],
    keputrian: ["view"],
    bimbingan_konseling: ["view"],
    olahraga_seni: ["view"],
    kegiatan_muda_mudi: ["view"],
    tahfidz: ["view"],
    media_publikasi: ["view"],
    desa: ["manage"],
    kelompok: ["manage"],
  }),
  desa: ac.newRole({
    pjp_desa: ["manage", "view"],
    kelompok: ["manage"],
  }),
  kelompok: ac.newRole({
    pjp_kelompok: ["manage", "view"],
    dokumen: ["download"],
  }),

  sekretariat: ac.newRole({
    proker: ["view", "manage"],
    musyawarah_bidang: ["view", "manage"],
    musyawarah_ppg: ["view", "manage"],
    sekretariat: ["manage", "view"],
  }),
  kurikulum: ac.newRole({
    proker: ["view", "manage"],
    musyawarah_bidang: ["view", "manage"],
    musyawarah_ppg: ["view", "manage"],
    kurikulum: ["manage", "view"],
  }),
  tenaga_pendidik: ac.newRole({
    proker: ["view", "manage"],
    musyawarah_bidang: ["view", "manage"],
    musyawarah_ppg: ["view", "manage"],
    tenaga_pendidik: ["manage", "view"],
  }),
  penggalang_dana: ac.newRole({
    proker: ["view", "manage"],
    musyawarah_bidang: ["view", "manage"],
    musyawarah_ppg: ["view", "manage"],
    penggalang_dana: ["manage", "view"],
  }),
  sarana_prasarana: ac.newRole({
    proker: ["view", "manage"],
    musyawarah_bidang: ["view", "manage"],
    musyawarah_ppg: ["view", "manage"],
    sarana_prasarana: ["manage", "view"],
  }),
  kemandirian: ac.newRole({
    proker: ["view", "manage"],
    musyawarah_bidang: ["view", "manage"],
    musyawarah_ppg: ["view", "manage"],
    kemandirian: ["manage", "view"],
  }),
  keputrian: ac.newRole({
    proker: ["view", "manage"],
    musyawarah_bidang: ["view", "manage"],
    musyawarah_ppg: ["view", "manage"],
    keputrian: ["manage", "view"],
  }),
  bimbingan_konseling: ac.newRole({
    proker: ["view", "manage"],
    musyawarah_bidang: ["view", "manage"],
    musyawarah_ppg: ["view", "manage"],
    bimbingan_konseling: ["manage", "view"],
  }),
  olahraga_seni: ac.newRole({
    proker: ["view", "manage"],
    musyawarah_bidang: ["view", "manage"],
    musyawarah_ppg: ["view", "manage"],
    olahraga_seni: ["manage", "view"],
  }),
  kegiatan_muda_mudi: ac.newRole({
    proker: ["view", "manage"],
    musyawarah_bidang: ["view", "manage"],
    musyawarah_ppg: ["view", "manage"],
    kegiatan_muda_mudi: ["manage", "view"],
  }),
  tahfidz: ac.newRole({
    proker: ["view", "manage"],
    musyawarah_bidang: ["view", "manage"],
    musyawarah_ppg: ["view", "manage"],
    tahfidz: ["manage", "view"],
  }),
  media_publikasi: ac.newRole({
    proker: ["view", "manage"],
    musyawarah_bidang: ["view", "manage"],
    musyawarah_ppg: ["view", "manage"],
    media_publikasi: ["manage", "view"],
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
] as const;

export const viewWhitelist = new Set(["admin", "daerah"]);

export enum BidangDisplay {
  sekretariat = "Sekretariat",
  kurikulum = "Kurikulum",
  tenaga_pendidik = "Tenaga Pendidik",
  penggalang_dana = "Penggalang Dana",
  sarana_prasarana = "Sarana Prasarana",
  kemandirian = "Kemandirian",
  keputrian = "Keputrian",
  bimbingan_konseling = "Bimbingan Konseling",
  olahraga_seni = "Olahraga & Seni",
  kegiatan_muda_mudi = "Kegiatan Muda Mudi",
  tahfidz = "Tahfidz",
  media_publikasi = "Media Publikasi",
}
