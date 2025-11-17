import { date, integer, pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import {
  absensiEnum,
  genderEnum,
  kelasGenerusEnum,
  pengajianEnum,
  sekolahEnum,
  statusGenerusEnum,
} from "../../../shared/enum";
import { createdUpdated } from "./common";
import { daerahTable, desaTable, kelompokTable } from "./wilayah";

export const generusTable = pgTable("generus", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  nama: text().notNull(),
  noTelepon: text().notNull(),
  noTeleponOrtu: text().notNull(),
  tempatLahir: text().notNull(),
  tanggalLahir: date({ mode: "string" }),
  gender: text({ enum: genderEnum }).notNull(),
  namaOrtu: text().notNull(),
  kelasSekolah: text({ enum: sekolahEnum }).notNull(),
  kelasPengajian: text({ enum: pengajianEnum }).notNull(),
  foto: text().notNull(),
  tanggalMasukKelas: date({ mode: "date" }).notNull(),
  daerahId: integer()
    .notNull()
    .references(() => daerahTable.id, {
      onDelete: "cascade",
    }),
  desaId: integer()
    .notNull()
    .references(() => desaTable.id, {
      onDelete: "cascade",
    }),
  kelompokId: integer()
    .notNull()
    .references(() => kelompokTable.id, {
      onDelete: "cascade",
    }),
  ...createdUpdated,
});

export const generusStatusTable = pgTable(
  "generus_status",
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    generusId: integer()
      .notNull()
      .references(() => generusTable.id, { onDelete: "cascade" }),
    status: text({ enum: statusGenerusEnum }).notNull(),
  },
  (table) => [
    uniqueIndex("unique_status_generus").on(table.generusId, table.status),
  ]
);

export const kelasTable = pgTable("kelas", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  nama: text({ enum: kelasGenerusEnum }).notNull(),
  keterangan: text().notNull().default(""),
  tanggal: date({ mode: "string" }).notNull(),
  kelompokId: integer()
    .notNull()
    .references(() => kelompokTable.id, { onDelete: "cascade" }),
  ...createdUpdated,
});

export const absensiGenerusTable = pgTable(
  "absensi_generus",
  {
    id: integer().primaryKey().generatedByDefaultAsIdentity(),
    kelasId: integer()
      .notNull()
      .references(() => kelasTable.id, { onDelete: "cascade" }),
    generusId: integer()
      .notNull()
      .references(() => generusTable.id, { onDelete: "cascade" }),
    keterangan: text({ enum: absensiEnum }).notNull(),
    detail: text().notNull().default(""),
    ...createdUpdated,
  },
  (table) => [
    uniqueIndex("unique_absen_per_generus_per_kelas").on(
      table.kelasId,
      table.generusId
    ),
  ]
);
