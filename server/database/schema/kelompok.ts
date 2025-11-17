import { date, integer, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { createdUpdated } from "./common";
import { generusTable } from "./generus";
import { kelompokTable } from "./wilayah";
import { absensiEnum, statusKonselingEnum } from "../../../shared/enum";

export const musyawarahMuslimunTable = pgTable("musyawarah_muslimun", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  nama: text().notNull(),
  tanggal: date({ mode: "string" }).notNull(),
  kelompokId: integer()
    .notNull()
    .references(() => kelompokTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
});

export const laporanMusyawarahMuslimunTable = pgTable(
  "laporan_musyawarah_muslimun",
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    musyawarahId: integer()
      .notNull()
      .references(() => musyawarahMuslimunTable.id, { onDelete: "cascade" }),
    laporan: text().notNull(),
    keterangan: text().notNull(),
    ...createdUpdated,
  }
);

export const jamaahTable = pgTable("jamaah", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  nama: text().notNull(),
  kelompokId: integer()
    .notNull()
    .references(() => kelompokTable.id, {
      onDelete: "cascade",
    }),
  ...createdUpdated,
});

export const pengajianTable = pgTable("pengajian", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  nama: text().notNull(),
  tanggal: date({ mode: "string" }).notNull(),
  kelompokId: integer()
    .notNull()
    .references(() => kelompokTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
});

export const absensiJamaahKelompokTable = pgTable(
  "absensi_jamaah_kelompok",
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    pengajianId: integer()
      .notNull()
      .references(() => pengajianTable.id, { onDelete: "cascade" }),
    jamaahId: integer()
      .notNull()
      .references(() => jamaahTable.id, { onDelete: "cascade" }),
    keterangan: text({ enum: absensiEnum }).notNull(),
    detail: text().notNull().default(""),
    ...createdUpdated,
  },
  (table) => [
    uniqueIndex("unique_absen_per_jamaah_per_pengajian").on(
      table.jamaahId,
      table.pengajianId
    ),
  ]
);

export const generusKonselingTable = pgTable("generus_konseling", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  generusId: integer()
    .notNull()
    .references(() => generusTable.id, { onDelete: "cascade" }),
  keterangan: text().notNull(),
  status: text({ enum: statusKonselingEnum }).notNull(),
  kelompokId: integer()
    .notNull()
    .references(() => kelompokTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
});
