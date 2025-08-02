import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { roles } from "../../../shared/permission";
import { timestamp } from "./common";
import { daerahTable } from "./wilayah";

const bulanOptions = [
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

export const prokerTable = sqliteTable("proker", {
  id: int().primaryKey({ autoIncrement: true }),
  kegiatan: text().notNull(),
  peserta: text().notNull(),
  bulan: text({ enum: bulanOptions }).notNull(),
  tahun: int().notNull(),
  biaya: int().notNull(),
  keterangan: text().notNull(),
  mingguKe: int().notNull(),
  bidang: text({
    enum: roles,
  }).notNull(),
  daerahId: int()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  status: text({ enum: ["Aktif", "Pending", "Terlaksana"] })
    .notNull()
    .default("Aktif"),
  ...timestamp,
});

export const musyawarahBidangTable = sqliteTable("musyawarah_bidang", {
  id: int().primaryKey({ autoIncrement: true }),
  nama: text().notNull(),
  tanggal: text().notNull(),
  bidang: text({ enum: roles }).notNull(),
  daerahId: int()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  ...timestamp,
});

export const laporanMusyawarahBidangTable = sqliteTable(
  "laporan_musyawarah_bidang",
  {
    id: int().primaryKey({ autoIncrement: true }),
    musyawarahId: int()
      .notNull()
      .references(() => musyawarahBidangTable.id, { onDelete: "cascade" }),
    laporan: text({ mode: "json" }).$type<string[]>().notNull(),
    keterangan: text({ mode: "json" }).$type<string[]>().notNull(),
    ...timestamp,
  }
);
