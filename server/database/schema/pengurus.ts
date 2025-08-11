import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { roles } from "../../../shared/permission";
import { timestamp } from "./common";
import { daerahTable } from "./wilayah";

export const pengurusTable = sqliteTable("pengurus", {
  id: int().primaryKey({ autoIncrement: true }),
  nama: text().notNull(),
  tempatLahir: text().notNull(),
  tanggalLahir: text().notNull(),
  pendidikan: text().notNull(),
  bidang: text({
    enum: roles,
  }).notNull(),
  foto: text().notNull(),
  daerahId: int()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  ...timestamp,
});

export const musyawarahTable = sqliteTable("musyawarah", {
  id: int().primaryKey({ autoIncrement: true }),
  nama: text().notNull(),
  tanggal: text().notNull(),
  daerahId: int()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  absensi: int({ mode: "boolean" }).notNull().default(false),
  ...timestamp,
});

export const laporanMusyawarahTable = sqliteTable("laporan_musyawarah", {
  id: int().primaryKey({ autoIncrement: true }),
  musyawarahId: int()
    .notNull()
    .references(() => musyawarahTable.id, { onDelete: "cascade" }),
  bidang: text({
    enum: roles,
  }).notNull(),
  laporan: text({ mode: "json" }).$type<string[]>().notNull(),
  keterangan: text({ mode: "json" }).$type<string[]>().notNull(),
  ...timestamp,
});

export const absensiPengurusTable = sqliteTable("absensi_pengurus", {
  id: int().primaryKey({ autoIncrement: true }),
  musyawarahId: int()
    .notNull()
    .references(() => musyawarahTable.id, { onDelete: "cascade" }),
  pengurusId: int()
    .notNull()
    .references(() => pengurusTable.id, { onDelete: "cascade" }),
  keterangan: text().notNull(),
  detail: text().notNull().default(""),
  ...timestamp,
});
