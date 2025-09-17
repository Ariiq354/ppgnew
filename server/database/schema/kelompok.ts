import { daerahTable, desaTable, kelompokTable } from "./wilayah";
import { createdUpdated } from "./common";
import { generusTable } from "./generus";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const musyawarahMuslimunTable = pgTable("musyawarah_muslimun", {
  id: serial().primaryKey(),
  nama: text().notNull(),
  tanggal: text().notNull(),
  kelompokId: integer()
    .notNull()
    .references(() => kelompokTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
});

export const laporanMusyawarahMuslimunTable = pgTable(
  "laporan_musyawarah_muslimun",
  {
    id: serial().primaryKey(),
    musyawarahId: integer()
      .notNull()
      .references(() => musyawarahMuslimunTable.id, { onDelete: "cascade" }),
    laporan: text().notNull(),
    keterangan: text().notNull(),
    ...createdUpdated,
  }
);

export const jamaahTable = pgTable("jamaah", {
  id: serial().primaryKey(),
  nama: text().notNull(),
  daerahId: integer()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  desaId: integer()
    .notNull()
    .references(() => desaTable.id, { onDelete: "cascade" }),
  kelompokId: integer()
    .notNull()
    .references(() => kelompokTable.id, {
      onDelete: "cascade",
    }),
  ...createdUpdated,
});

export const pengajianTable = pgTable("pengajian", {
  id: serial().primaryKey(),
  nama: text().notNull(),
  tanggal: text().notNull(),
  kelompokId: integer()
    .notNull()
    .references(() => kelompokTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
});

export const absensiJamaahKelompokTable = pgTable("absensi_jamaah_kelompok", {
  id: serial().primaryKey(),
  pengajianId: integer()
    .notNull()
    .references(() => pengajianTable.id, { onDelete: "cascade" }),
  jamaahId: integer()
    .notNull()
    .references(() => jamaahTable.id, { onDelete: "cascade" }),
  keterangan: text().notNull(),
  detail: text().notNull().default(""),
  ...createdUpdated,
});

export const generusKonselingTable = pgTable("generus_konseling", {
  id: serial().primaryKey(),
  generusId: integer()
    .notNull()
    .references(() => generusTable.id, { onDelete: "cascade" }),
  keterangan: text().notNull(),
  status: text({ enum: ["Baru", "Diproses", "Selesai"] }).notNull(),
  daerahId: integer()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
});
