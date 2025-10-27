import { z } from "zod/mini";

export const schema = z.object({
  id: z.optional(z.number()),
  laporan: z.string().check(z.minLength(1, "Required")),
  keterangan: z.string().check(z.minLength(1, "Required")),
});

export const getInitialFormData = (): Schema => ({
  id: undefined,
  laporan: "Laporan tanggal " + new Date().toLocaleDateString("en-GB"),
  keterangan: templateString,
});

export type Schema = z.infer<typeof schema>;

export const laporanTemplate =
  "Laporan tanggal " + new Date().toLocaleDateString("en-GB");

export const templateString = `
  <p>Tanggal Pramuslimun:</p><h3>Jumlah Generus</h3><p>PAUD: <br>Cabe Rawit: <br>Praremaja:<br>Remaja:<br>Pranikah:<br>Usia Mandiri:</p><h3>Jadwal Pengajian Generus Per Minggu</h3><p>PAUD:<br>Cabe Rawit:<br>Praremaja:<br>Muda-mudi:</p><h3>Presentase Kehadiran Per Bulan</h3><p>PAUD:<br>Cabe Rawit:<br>Praremaja:<br>Muda-mudi:</p><h3>Koin PPG: </h3> <h3>Permasalahan dan Solusi</h3><p></p><p></p><p></p>
`;
