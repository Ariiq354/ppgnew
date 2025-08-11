import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { daerahTable, desaTable, kelompokTable } from "./wilayah";
import { timestamp } from "./common";
import { generusTable } from "./generus";

export const musyawarahMuslimunTable = sqliteTable("musyawarah_muslimun", {
  id: int().primaryKey({ autoIncrement: true }),
  nama: text().notNull(),
  tanggal: text().notNull(),
  kelompokId: int()
    .notNull()
    .references(() => kelompokTable.id, { onDelete: "cascade" }),
  absensi: int({ mode: "boolean" }).notNull().default(false),
  ...timestamp,
});

export const laporanMusyawarahMuslimunTable = sqliteTable(
  "laporan_musyawarah_muslimun",
  {
    id: int().primaryKey({ autoIncrement: true }),
    musyawarahId: int()
      .notNull()
      .references(() => musyawarahMuslimunTable.id, { onDelete: "cascade" }),
    laporan: text({ mode: "json" }).$type<string[]>().notNull(),
    keterangan: text({ mode: "json" }).$type<string[]>().notNull(),
    ...timestamp,
  }
);

export const jamaahTable = sqliteTable("jamaah", {
  id: int().primaryKey({ autoIncrement: true }),
  nama: text().notNull(),
  daerahId: int()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  desaId: int()
    .notNull()
    .references(() => desaTable.id, { onDelete: "cascade" }),
  kelompokId: int()
    .notNull()
    .references(() => kelompokTable.id, {
      onDelete: "cascade",
    }),
  ...timestamp,
});

export const kelasKelompokTable = sqliteTable("kelas_kelompok", {
  id: int().primaryKey({ autoIncrement: true }),
  nama: text().notNull(),
  tanggal: text().notNull(),
  kelompokId: int()
    .notNull()
    .references(() => kelompokTable.id, { onDelete: "cascade" }),
  absensi: int({ mode: "boolean" }).notNull().default(false),
  ...timestamp,
});

export const absensiJamaahKelompokTable = sqliteTable(
  "absensi_jamaah_kelompok",
  {
    id: int().primaryKey({ autoIncrement: true }),
    kelasId: int()
      .notNull()
      .references(() => kelasKelompokTable.id, { onDelete: "cascade" }),
    jamaahId: int()
      .notNull()
      .references(() => jamaahTable.id, { onDelete: "cascade" }),
    keterangan: text().notNull(),
    detail: text().notNull().default(""),
    ...timestamp,
  }
);

export const generusKonselingTable = sqliteTable("generus_konseling", {
  id: int().primaryKey({ autoIncrement: true }),
  generusId: int()
    .notNull()
    .references(() => generusTable.id, { onDelete: "cascade" }),
  keterangan: text().notNull(),
  status: text({ enum: ["Baru", "Diproses", "Selesai"] }).notNull(),
  daerahId: int()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  ...timestamp,
});
