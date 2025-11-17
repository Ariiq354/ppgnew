export const sekolahEnum = [
  "PAUD/TK",
  "SD 1",
  "SD 2",
  "SD 3",
  "SD 4",
  "SD 5",
  "SD 6",
  "SMP 7",
  "SMP 8",
  "SMP 9",
  "SMA 10",
  "SMA 11",
  "SMA 12",
  "Kuliah",
  "Bekerja / Tidak Bekerja",
] as const;

export const pengajianEnum = [
  "PAUD",
  "Cabe Rawit",
  "Praremaja",
  "Remaja",
  "Pranikah",
  "Usia Mandiri",
] as const;

export const absensiEnum = ["Hadir", "Izin", "Tanpa Keterangan"] as const;

export const genderEnum = ["Laki-laki", "Perempuan"] as const;

export const statusPengajarEnum = [
  "Mubalig Tugasan",
  "Mubalig Setempat",
  "Asisten Pengajar",
] as const;

export const kelasMudamudiEnum = ["Muda-mudi", "Usia Mandiri"] as const;

export const kelasGenerusEnum = [
  "PAUD",
  "Cabe Rawit",
  "Praremaja",
  "Muda-mudi",
] as const;

export const statusKonselingEnum = ["Baru", "Diproses", "Selesai"] as const;

export const statusGenerusEnum = [
  "GPS",
  "Tahfidz",
  "Pindah",
  "Mondok",
  "Tugas",
  "Sudah Menikah",
] as const;

export const bulanEnum = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
] as const;

export const bidangEnum = [
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
] as const;

export const statusProkerEnum = ["Pending", "Aktif", "Terlaksana"] as const;

export const exclude = ["Pindah", "Mondok", "Tugas"] as const;
