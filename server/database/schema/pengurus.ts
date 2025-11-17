import { date, integer, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { createdUpdated } from "./common";
import { daerahTable } from "./wilayah";
import { absensiEnum, bidangEnum } from "../../../shared/enum";

export const pengurusTable = pgTable("pengurus", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  nama: text().notNull(),
  tempatLahir: text().notNull(),
  tanggalLahir: date({ mode: "string" }).notNull(),
  pendidikan: text().notNull(),
  bidang: text({
    enum: bidangEnum,
  }).notNull(),
  foto: text().notNull(),
  daerahId: integer()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
});

export const musyawarahTable = pgTable("musyawarah", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  nama: text().notNull(),
  tanggal: date({ mode: "string" }).notNull(),
  daerahId: integer()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
});

export const laporanMusyawarahTable = pgTable("laporan_musyawarah", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  musyawarahId: integer()
    .notNull()
    .references(() => musyawarahTable.id, { onDelete: "cascade" }),
  bidang: text({
    enum: bidangEnum,
  }).notNull(),
  laporan: text().notNull(),
  keterangan: text().notNull(),
  ...createdUpdated,
});

export const absensiPengurusTable = pgTable(
  "absensi_pengurus",
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    musyawarahId: integer()
      .notNull()
      .references(() => musyawarahTable.id, { onDelete: "cascade" }),
    pengurusId: integer()
      .notNull()
      .references(() => pengurusTable.id, { onDelete: "cascade" }),
    keterangan: text({ enum: absensiEnum }).notNull(),
    detail: text().notNull().default(""),
    ...createdUpdated,
  },
  (table) => [
    uniqueIndex("unique_absen_per_pengurus_per_musyawarah").on(
      table.musyawarahId,
      table.pengurusId
    ),
  ]
);
