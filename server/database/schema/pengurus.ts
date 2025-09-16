import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { roles } from "../../../shared/permission";
import { createdUpdated } from "./common";
import { daerahTable } from "./wilayah";

export const pengurusTable = pgTable("pengurus", {
  id: serial().primaryKey(),
  nama: text().notNull(),
  tempatLahir: text().notNull(),
  tanggalLahir: text().notNull(),
  pendidikan: text().notNull(),
  bidang: text({
    enum: roles,
  }).notNull(),
  foto: text().notNull(),
  daerahId: integer()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
});

export const musyawarahTable = pgTable("musyawarah", {
  id: serial().primaryKey(),
  nama: text().notNull(),
  tanggal: text().notNull(),
  daerahId: integer()
    .notNull()
    .references(() => daerahTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
});

export const laporanMusyawarahTable = pgTable("laporan_musyawarah", {
  id: serial().primaryKey(),
  musyawarahId: integer()
    .notNull()
    .references(() => musyawarahTable.id, { onDelete: "cascade" }),
  bidang: text({
    enum: roles,
  }).notNull(),
  laporan: text().notNull(),
  keterangan: text().notNull(),
  ...createdUpdated,
});

export const absensiPengurusTable = pgTable("absensi_pengurus", {
  id: serial().primaryKey(),
  musyawarahId: integer()
    .notNull()
    .references(() => musyawarahTable.id, { onDelete: "cascade" }),
  pengurusId: integer()
    .notNull()
    .references(() => pengurusTable.id, { onDelete: "cascade" }),
  keterangan: text().notNull(),
  detail: text().notNull().default(""),
  ...createdUpdated,
});
