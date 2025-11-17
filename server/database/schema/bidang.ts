import { date, integer, pgTable, smallint, text } from "drizzle-orm/pg-core";
import { bidangEnum, bulanEnum, statusProkerEnum } from "../../../shared/enum";
import { createdUpdated } from "./common";
import { daerahTable } from "./wilayah";

export const prokerTable = pgTable("proker", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  kegiatan: text().notNull(),
  peserta: text().notNull(),
  bulan: text({ enum: bulanEnum }).notNull(),
  tahun: integer().notNull(),
  biaya: integer().notNull(),
  keterangan: text().notNull(),
  mingguKe: smallint().notNull(),
  bidang: text({
    enum: bidangEnum,
  }).notNull(),
  daerahId: integer()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  status: text({ enum: statusProkerEnum }).notNull(),
  ...createdUpdated,
});

export const musyawarahBidangTable = pgTable("musyawarah_bidang", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  nama: text().notNull(),
  tanggal: date({ mode: "string" }).notNull(),
  bidang: text({ enum: bidangEnum }).notNull(),
  daerahId: integer()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
});

export const laporanMusyawarahBidangTable = pgTable(
  "laporan_musyawarah_bidang",
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    musyawarahId: integer()
      .notNull()
      .references(() => musyawarahBidangTable.id, { onDelete: "cascade" }),
    laporan: text().notNull(),
    keterangan: text().notNull(),
    ...createdUpdated,
  }
);
