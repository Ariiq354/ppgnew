import { date, integer, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { createdUpdated } from "./common";
import { generusTable } from "./generus";
import { desaTable } from "./wilayah";
import { absensiEnum, kelasGenerusEnum } from "../../../shared/enum";

export const kelasDesaTable = pgTable("kelas_desa", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  nama: text({ enum: kelasGenerusEnum }).notNull(),
  keterangan: text().notNull().default(""),
  tanggal: date({ mode: "string" }).notNull(),
  desaId: integer()
    .notNull()
    .references(() => desaTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
});

export const absensiGenerusDesaTable = pgTable(
  "absensi_generus_desa",
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    kelasId: integer()
      .notNull()
      .references(() => kelasDesaTable.id, { onDelete: "cascade" }),
    generusId: integer()
      .notNull()
      .references(() => generusTable.id, { onDelete: "cascade" }),
    keterangan: text({ enum: absensiEnum }).notNull(),
    detail: text().notNull().default(""),
    ...createdUpdated,
  },
  (table) => [
    uniqueIndex("unique_absen_per_generus_per_kelas_desa").on(
      table.kelasId,
      table.generusId
    ),
  ]
);

export const kelasGpsTable = pgTable("kelas_gps", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  nama: text().notNull(),
  tanggal: date({ mode: "string" }).notNull(),
  desaId: integer()
    .notNull()
    .references(() => desaTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
});

export const absensiGenerusGpsTable = pgTable(
  "absensi_generus_gps",
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    kelasId: integer()
      .notNull()
      .references(() => kelasGpsTable.id, { onDelete: "cascade" }),
    generusId: integer()
      .notNull()
      .references(() => generusTable.id, { onDelete: "cascade" }),
    keterangan: text({ enum: absensiEnum }).notNull(),
    detail: text().notNull().default(""),
    ...createdUpdated,
  },
  (table) => [
    uniqueIndex("unique_absen_per_generus_per_gps").on(
      table.kelasId,
      table.generusId
    ),
  ]
);
