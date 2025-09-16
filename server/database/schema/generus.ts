import { daerahTable, desaTable, kelompokTable } from "./wilayah";
import { createdUpdated } from "./common";
import {
  integer,
  json,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const generusTable = pgTable("generus", {
  id: serial().primaryKey(),
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
  status: json().$type<string[]>().notNull(),
  tanggalMasukKelas: timestamp({ withTimezone: true }).notNull(),
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

export const kelasTable = pgTable("kelas", {
  id: serial().primaryKey(),
  nama: text().notNull(),
  tanggal: text().notNull(),
  kelompokId: integer()
    .notNull()
    .references(() => kelompokTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
});

export const absensiGenerusTable = pgTable("absensi_generus", {
  id: serial().primaryKey(),
  kelasId: integer()
    .notNull()
    .references(() => kelasTable.id, { onDelete: "cascade" }),
  generusId: integer()
    .notNull()
    .references(() => generusTable.id, { onDelete: "cascade" }),
  keterangan: text().notNull(),
  detail: text().notNull().default(""),
  ...createdUpdated,
});
