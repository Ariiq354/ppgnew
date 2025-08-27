import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { daerahTable, desaTable, kelompokTable } from "./wilayah";
import { timestamp } from "./common";

export const generusTable = sqliteTable("generus", {
  id: int().primaryKey({ autoIncrement: true }),
  nama: text().notNull(),
  noTelepon: text().notNull(),
  noTeleponOrtu: text().notNull(),
  tempatLahir: text().notNull(),
  tanggalLahir: text().notNull(),
  gender: text().notNull(),
  namaOrtu: text().notNull(),
  kelasSekolah: text().notNull(),
  kelasPengajian: text().notNull(),
  foto: text().notNull(),
  status: text().notNull().default(""),
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

export const kelasTable = sqliteTable("kelas", {
  id: int().primaryKey({ autoIncrement: true }),
  nama: text().notNull(),
  tanggal: text().notNull(),
  kelompokId: int()
    .notNull()
    .references(() => kelompokTable.id, { onDelete: "cascade" }),
  ...timestamp,
});

export const absensiGenerusTable = sqliteTable("absensi_generus", {
  id: int().primaryKey({ autoIncrement: true }),
  kelasId: int()
    .notNull()
    .references(() => kelasTable.id, { onDelete: "cascade" }),
  generusId: int()
    .notNull()
    .references(() => generusTable.id, { onDelete: "cascade" }),
  keterangan: text().notNull(),
  detail: text().notNull().default(""),
  ...timestamp,
});
