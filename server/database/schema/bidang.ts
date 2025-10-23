import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { roles } from "../../../shared/permission";
import { createdUpdated } from "./common";
import { daerahTable } from "./wilayah";
import { bulanOptions } from "~~/shared/contants";

export const prokerTable = pgTable("proker", {
  id: serial().primaryKey(),
  kegiatan: text().notNull(),
  peserta: text().notNull(),
  bulan: text({ enum: bulanOptions }).notNull(),
  tahun: integer().notNull(),
  biaya: integer().notNull(),
  keterangan: text().notNull(),
  mingguKe: integer().notNull(),
  bidang: text({
    enum: roles,
  }).notNull(),
  daerahId: integer()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  status: text({ enum: ["Aktif", "Pending", "Terlaksana"] })
    .notNull()
    .default("Aktif"),
  ...createdUpdated,
});

export const musyawarahBidangTable = pgTable("musyawarah_bidang", {
  id: serial().primaryKey(),
  nama: text().notNull(),
  tanggal: text().notNull(),
  bidang: text({ enum: roles }).notNull(),
  daerahId: integer()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
});

export const laporanMusyawarahBidangTable = pgTable(
  "laporan_musyawarah_bidang",
  {
    id: serial().primaryKey(),
    musyawarahId: integer()
      .notNull()
      .references(() => musyawarahBidangTable.id, { onDelete: "cascade" }),
    laporan: text().notNull(),
    keterangan: text().notNull(),
    ...createdUpdated,
  }
);
